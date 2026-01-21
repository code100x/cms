#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "❌ Error: .env file not found!"
  exit 1
fi

# Set the target environment (default to 'development' if not provided)
ENVIRONMENT=${1:-development}
VERCEL_TOKEN=${2}
NEXTAUTH_URL=${3}

# Read .env file line by line
while IFS='=' read -r key value || [ -n "$key" ]; do
  # Ignore empty lines and comments
  if [[ -z "$key" || "$key" =~ ^# ]]; then
    continue
  fi

  # Trim whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  # Ensure key-value pair is valid
  if [[ -z "$key" || -z "$value" ]]; then
    echo "⚠️ Warning: Skipping invalid line in .env"
    continue
  fi

  # Override DBURL with the system environment variable if set
  if [[ "$key" == "DATABASE_URL" && -n "$DB_URL" ]]; then
    value="$DB_URL"
    echo "🔐 Using external DATABASE_URL from system environment"
  fi

  # Override NEXTAUTHURL and base url with the system environment variable if set
  if [[ "$key" == "NEXTAUTH_URL" && -n "$NEXTAUTH_URL" ]]; then
    value="$NEXTAUTH_URL"
    echo "🔐 Added Nextauth url"
  fi
  
  if [[ "$key" == "NEXT_PUBLIC_BASE_URL_LOCAL" && -n "$NEXTAUTH_URL" ]]; then
    value="$NEXTAUTH_URL"
    echo "🔐 Added base url"
  fi
  

  # Add the environment variable to Vercel
  echo -n "$value" | vercel env add "$key" "$ENVIRONMENT" --token="$VERCEL_TOKEN"

  if [ $? -eq 0 ]; then
    echo "✅ Added $key to Vercel ($ENVIRONMENT)"
  else
    echo "❌ Error: Failed to add $key to Vercel"
    exit 1
  fi
done < .env

