WORKDIR /src

COPY backend-csharp/AfricanDigitalUniversity.Api/AfricanDigitalUniversity.Api.csproj ./AfricanDigitalUniversity.Api/
RUN dotnet restore ./AfricanDigitalUniversity.Api/AfricanDigitalUniversity.Api.csproj

COPY backend-csharp/AfricanDigitalUniversity.Api/ ./AfricanDigitalUniversity.Api/

WORKDIR /src/AfricanDigitalUniversity.Api

RUN dotnet publish -c Release -o /app/out
