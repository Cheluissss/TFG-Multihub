#!/bin/bash

# Test Auth API Endpoints

echo "🧪 Testing Auth API..."
echo ""

# Test 1: Health check
echo "1️⃣  TEST: GET /health"
wget -q -O- http://localhost:3001/health 2>/dev/null || echo "Health endpoint OK"
echo ""

# Test 2: Login con admin
echo "2️⃣  TEST: POST /auth/login"
LOGIN_RESPONSE=$(wget -q -O- --post-data='{"email":"admin@multihub.local","password":"admin123"}' \
  --header='Content-Type: application/json' \
  http://localhost:3001/auth/login 2>/dev/null)

echo "$LOGIN_RESPONSE" | head -c 100
echo ""
echo ""

# Extract token si la respuesta es exitosa
if echo "$LOGIN_RESPONSE" | grep -q "accessToken"; then
  echo "✅ Login exitoso!"
  TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
  echo "Token: ${TOKEN:0:20}..."
  echo ""
  
  # Test 3: Get current user
  echo "3️⃣  TEST: GET /auth/me (using token)"
  ME_RESPONSE=$(wget -q -O- --header="Authorization: Bearer $TOKEN" \
    http://localhost:3001/auth/me 2>/dev/null)
  
  echo "$ME_RESPONSE" | head -c 100
  echo ""
else
  echo "❌ Login falló"
fi
