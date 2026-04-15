# ───────────── BUILD STAGE ─────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY backend-csharp/AfricanDigitalUniversity.Api/AfricanDigitalUniversity.Api.csproj ./AfricanDigitalUniversity.Api/
RUN dotnet restore ./AfricanDigitalUniversity.Api/AfricanDigitalUniversity.Api.csproj

COPY backend-csharp/AfricanDigitalUniversity.Api/ ./AfricanDigitalUniversity.Api/

WORKDIR /src/AfricanDigitalUniversity.Api
RUN dotnet publish -c Release -o /app/out

# ───────────── RUNTIME STAGE ─────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "AfricanDigitalUniversity.Api.dll"]
