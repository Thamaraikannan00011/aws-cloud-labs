# Lambda passes the output as a JSON object to SNS

import json
import urllib.parse

def lambda_handler(event, context):
    # Get first record from S3 event
    record = event["Records"][0]

    bucket = record["s3"]["bucket"]["name"]
    key = record["s3"]["object"]["key"]
    key = urllib.parse.unquote_plus(key)
    file_name = key.split("/")[-1]

    print(f"New file uploaded: s3://{bucket}/{key}")
    print(f"File name only    : {file_name}")

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "S3 event received",
            "bucket": bucket,
            "key": key,
            "fileName": file_name
        }),
    }
