# Copy the template to the definitive file
cp .env-template .env
printf "Replace .env template file values with variables\n"
sed -i "/PGSERVER_HOST/c\\$PGSERVER_HOST" .env
sed -i "/BDCONFIG_CNXSTRING/c\\$BDCONFIG_CNXSTRING" .env
# Create the folder if not exists
ssh ubuntu@$OCTANPOS_API_HOST 'mkdir -p /tmp/octanpos-api'
# Compress the files
tar -czf api-build.tar.gz build/ node_modules/ .env
printf "start copying build files to remote machine \n"
scp api-build.tar.gz ubuntu@$OCTANPOS_API_HOST:/tmp/octanpos-api
printf "Copy completed\n\n"
printf "Stopping service\n"
ssh ubuntu@$OCTANPOS_API_HOST 'sudo systemctl stop octanpos-api'
printf "Delete old files, move new files, change owners"
ssh ubuntu@$OCTANPOS_API_HOST 'sudo tar -xf /tmp/octanpos-api/api-build.tar.gz --directory /home/api-service/app --overwrite; sudo chown -R api-service:alvic /home/api-service/app'
prtinf "Start service"
ssh ubuntu@$OCTANPOS_API_HOST 'sudo systemctl start octanpos-api'