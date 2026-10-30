import { ContactMessage } from '../types';

const awsApiGatewayUrl = import.meta.env.VITE_AWS_API_GATEWAY_URL;
const awsRegion = import.meta.env.VITE_AWS_REGION || 'us-east-1';
const awsDynamoTable = import.meta.env.VITE_AWS_DYNAMODB_TABLE || 'nexora_contact_messages';

export const isAwsConfigured = Boolean(
  awsApiGatewayUrl &&
  awsApiGatewayUrl.trim() !== '' &&
  !awsApiGatewayUrl.includes('your-api-id')
);

export interface SubmissionResult {
  success: boolean;
  message: string;
  data?: ContactMessage;
  isSimulated?: boolean;
  awsDetails?: {
    service: 'Amazon DynamoDB' | 'AWS API Gateway + Lambda';
    region: string;
    tableOrEndpoint: string;
  };
}

/**
 * Submits contact inquiry to AWS Serverless Architecture
 * (AWS API Gateway -> AWS Lambda -> Amazon DynamoDB / Amazon Aurora PostgreSQL)
 */
export async function submitContactMessage(
  payload: Omit<ContactMessage, 'id' | 'created_at'>
): Promise<SubmissionResult> {
  const sanitizedPayload = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    company: payload.company?.trim() || null,
    message: payload.message.trim(),
  };

  // If live AWS API Gateway or backend endpoint is configured
  if (isAwsConfigured && awsApiGatewayUrl) {
    try {
      const response = await fetch(awsApiGatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...sanitizedPayload,
          source: 'nexora_web_client',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `AWS API Gateway returned HTTP ${response.status}`);
      }

      const responseData = await response.json();

      return {
        success: true,
        message: 'Your message has been securely committed to Amazon DynamoDB.',
        data: {
          id: responseData.id || `aws-${crypto.randomUUID()}`,
          name: sanitizedPayload.name,
          email: sanitizedPayload.email,
          company: sanitizedPayload.company || undefined,
          message: sanitizedPayload.message,
          created_at: responseData.created_at || new Date().toISOString(),
        },
        isSimulated: false,
        awsDetails: {
          service: 'AWS API Gateway + Lambda',
          region: awsRegion,
          tableOrEndpoint: awsApiGatewayUrl,
        },
      };
    } catch (err: unknown) {
      console.error('Error invoking AWS API Gateway endpoint:', err);
      const errorMessage = err instanceof Error ? err.message : 'Connection failed';
      return {
        success: false,
        message: `AWS Service Error: ${errorMessage}`,
      };
    }
  }

  // Graceful local preview mode (simulates AWS DynamoDB PutItem latency & record generation)
  const simulatedId = `dynamo-${crypto.randomUUID()}`;
  const mockRecord: ContactMessage = {
    id: simulatedId,
    name: sanitizedPayload.name,
    email: sanitizedPayload.email,
    company: sanitizedPayload.company || undefined,
    message: sanitizedPayload.message,
    created_at: new Date().toISOString(),
  };

  // Cache in preview localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('nexora_aws_messages') || '[]');
    existing.unshift({
      ...mockRecord,
      _aws_target: `${awsRegion}:${awsDynamoTable}`,
    });
    localStorage.setItem('nexora_aws_messages', JSON.stringify(existing));
  } catch {
    // Ignore restricted storage contexts
  }

  // Realistic AWS Lambda cold-start/execution latency simulation
  await new Promise((resolve) => setTimeout(resolve, 650));

  return {
    success: true,
    message: 'Message processed via AWS Serverless simulation. Configure VITE_AWS_API_GATEWAY_URL to stream directly to production DynamoDB.',
    data: mockRecord,
    isSimulated: true,
    awsDetails: {
      service: 'Amazon DynamoDB',
      region: awsRegion,
      tableOrEndpoint: awsDynamoTable,
    },
  };
}

/**
 * AWS Infrastructure as Code (Terraform & SAM templates)
 */
export const AWS_SAM_TEMPLATE = `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: NEXORA AI Serverless Contact Ingestion Pipeline

Resources:
  # Amazon DynamoDB Table
  NexoraContactTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: nexora_contact_messages
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
        - AttributeName: created_at
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
        - AttributeName: created_at
          KeyType: RANGE
      SSESpecification:
        SSEEnabled: true

  # AWS Lambda Handler Function
  ContactHandlerFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs20.x
      Timeout: 10
      MemorySize: 256
      Environment:
        Variables:
          TABLE_NAME: !Ref NexoraContactTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref NexoraContactTable
      Events:
        ApiEvent:
          Type: HttpApi
          Properties:
            Path: /contact
            Method: POST

Outputs:
  ApiEndpoint:
    Description: HTTP API Gateway endpoint for VITE_AWS_API_GATEWAY_URL
    Value: !Sub "https://\${ServerlessHttpApi}.execute-api.\${AWS::Region}.amazonaws.com/contact"`;

export const AWS_TERRAFORM_TEMPLATE = `# Terraform configuration for AWS DynamoDB + API Gateway
resource "aws_dynamodb_table" "contact_messages" {
  name         = "nexora_contact_messages"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  range_key    = "created_at"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }
}`;
