# build client	
FROM node:10 as BUILD_CLIENT
COPY ./frontend /app
WORKDIR /app
RUN npm install	
RUN npm run build

# build server	
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS BUILD_SERVER
WORKDIR /app
COPY ./backend /app
RUN dotnet restore
RUN dotnet publish -c Release -o out

# copy client and server
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=BUILD_SERVER /app/out /app
COPY --from=BUILD_CLIENT /app/dist /app/wwwroot

# Main run command
EXPOSE 80
ENTRYPOINT ["dotnet", "Imagecadabra.dll"]