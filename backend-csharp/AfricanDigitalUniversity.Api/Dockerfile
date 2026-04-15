# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

COPY backend-csharp/AfricanDigitalUniversity.Api/AfricanDigitalUniversity.Api.csproj ./
RUN dotnet restore

COPY backend-csharp/AfricanDigitalUniversity.Api/. ./
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "AfricanDigitalUniversity.Api.dll"]
