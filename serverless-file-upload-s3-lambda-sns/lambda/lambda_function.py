# FORMMATED OUTPUT

import json
import urllib.parse
import boto3

sns = boto3.client("sns")
TOPIC_ARN = "arn:aws:sns:us-east-1:ACCOUNT_ID:s3-file-upload-notifications"

def lambda_handler(event, context):
    # Get S3 record
    record = event["Records"]
    bucket = record["s3"]["bucket"]["name"]
    key = urllib.parse.unquote_plus(record["s3"]["object"]["key"])
    file_name = key.split("/")[-1]
    event_time = record.get("eventTime")
    event_name = record.get("eventName")

    # Subject and body for SNS email
    subject = f"File upload successful: {file_name}"
    body = (
        "Serverless File Upload and Notification System\n\n"
        f'File "{file_name}" was uploaded to bucket "{bucket}".\n'
        f"Key: {key}\n"
        f"Event time: {event_time}\n"
        f"Event name: {event_name}\n"
    )

    # Publish notification to SNS
    response = sns.publish(
        TopicArn=TOPIC_ARN,
        Subject=subject,
        Message=body,
    )

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Notification sent via SNS",
            "snsMessageId": response.get("MessageId"),
            "bucket": bucket,
            "key": key,
            "fileName": file_name,
        }),
    }
