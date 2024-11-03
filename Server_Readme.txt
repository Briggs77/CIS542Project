Command to build container:
docker-compose up -d --build --force-recreate

Command to build and run container: 
docker-compose up --build

Command to Run the container in the background: 
docker-compose up -d

Command to stop Container:
docker-compose down

Command to view nextjs logs:
docker exec -it forensics-demo tail -f /var/log/nextjs.log

Command to view nextjs error logs:
docker exec -it forensics-demo tail -f /var/log/nextjs_err.log

Command to view Kerberos service logs:
docker exec -it forensics-demo tail -f /var/log/krb5kdc.log

Command to view Kerberos error logs:
docker exec -it forensics-demo tail -f /var/log/krb5kdc_err.log

Command to view Supervisor logs: 
docker exec -it forensics-demo tail -f /var/log/supervisord.log

Command to exec into container:
docker exec -it forensics-demo /bin/bash

Command to view all logs: 
docker exec -it forensics-demo /bin/bash -c "tail -f /var/log/nextjs.log /var/log/nextjs_err.log /var/log/krb5kdc.log /var/log/krb5kdc_err.log /var/log/supervisord.log"

Command to print out file names in logs folder:
docker exec -it forensics-demo ls /var/log

shows id's and other info about running containers
 docker ps 

Command to exec a terminal into container:
docker exec -it forensics-demo /bin/sh


Commands to make a new user in the kerberos server: 
________________________________________
|
|docker exec -it forensics-demo bash
|
|kadmin.local
|
|listprincs
|
|addprinc username@EXAMPLE.COM
|_______________________________________


nextjs commands:
    npm run dev

    npm run build


git commands:

check current remote branch:
git branch -vv

pull latest changes:
git pull

Detect/add all edited/new files for next commit (should be run from project root)
git add .

Set Commit message:
git commit -m "Your commit message"

Push commit to main branch:
git push origin main
