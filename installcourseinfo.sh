#!/bin/sh
if [ "$1" != "" ]
then
    INSTALLDIR=$1
else
    INSTALLDIR=${HOME}/coursesapi
fi
if [ -e ${INSTALLDIR} ]
then
    echo ${INSTALLDIR} already exists.
    exit -1
fi
express ${INSTALLDIR}
cp *.txt *.json *.js *.sh ${INSTALLDIR}
cd routes
cp *.js ${INSTALLDIR}/routes
cd ${INSTALLDIR}
npm install

