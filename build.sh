#!/bin/bash
set -x;
whoami
echo "SAILS-HOOK-ADMINPANEL"
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# delete sails assets
cd $SCRIPTPATH
rm -rf ../../assets/admin
rm -rf ../../.tmp/public/admin

mkdir -p ../../assets/admin
cp -r ./assets/* ../../assets/admin  

ls ../../.tmp/public/
mkdir -p ../../.tmp/public/admin
cp -r ./assets/* ../../.tmp/public/admin
