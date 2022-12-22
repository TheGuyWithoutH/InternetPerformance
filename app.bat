@echo off 

set CLEAN=clean
set RUN=run
set STOP=stop

set MODE=-mode
set DEV=dev
set PROD=prod

set argC=0
for %%x in (%*) do Set /A argC+=1

if %argC% EQU 0 (
    echo Usage: ./myapp [OPTIONS] COMMAND [arg...]
    echo        ./myapp [ -h ^| --help ]
    echo:
    echo Options:
    echo   -h, --help    Prints usage.
    echo:
    echo Commands:
    echo   %CLEAN%                      - Stop and Remove imoney containers.
    echo   %RUN%   -mode [%DEV% ^| %PROD%]   - Build and Run imoney.
    echo   %STOP%                       - Stop imoney.
    exit
)

if [%1]==[-h] (
    echo Usage: ./myapp [OPTIONS] COMMAND [arg...]
    echo        ./myapp [ -h ^| --help ]
    echo:
    echo Options:
    echo   -h, --help    Prints usage.
    echo:
    echo Commands:
    echo   %CLEAN%                      - Stop and Remove imoney containers.
    echo   %RUN%   -mode [%DEV% ^| %PROD%]   - Build and Run imoney.
    echo   %STOP%                       - Stop imoney.
    exit
)

if [%1]==[--help] (
    echo Usage: ./myapp [OPTIONS] COMMAND [arg...]
    echo        ./myapp [ -h ^| --help ]
    echo:
    echo Options:
    echo   -h, --help    Prints usage.
    echo:
    echo Commands:
    echo   %CLEAN%                      - Stop and Remove imoney containers.
    echo   %RUN%   -mode [%DEV% ^| %PROD%]   - Build and Run imoney.
    echo   %STOP%                       - Stop imoney.
    exit
)

if [%1]==[%CLEAN%] (
    echo "Cleaning..."
    CALL :clean
    exit
)

if [%1]==[%RUN%] (
    CALL :run %1 %2 %3 %argC%
    exit
)

if [%1]==[%STOP%] (
    CALL :stop_existing
    exit
)

exit

:clean 
    CALL :stop_existing
    CALL :remove_stopped_containers
    CALL :remove_unused_volumes 
EXIT /B 0

:run
    echo Cleaning...
    CALL :clean
    
    echo Running docker...
    if %4 EQU 3 (
        goto :args_here
    ) ELSE (
        goto :end
    )

    :args_here
    IF [%2]==[%MODE%] (
        goto :mode_here
    ) else (
        goto :end
    )
    
    :mode_here
    IF [%3]==[%PROD%] (
        docker-compose -f docker-compose.prod.yml up
        goto :end
    )

    IF [%3]==[%DEV%] (
        docker-compose up -d
    ) else (
        echo Invalid mode. Use -mode %PROD% or -mode %DEV%
    )

    :end
EXIT /B 0

:stop_existing
    FOR /F %%F IN ('"docker ps --all --quiet --filter=name=client"') DO SET MYAPPCLIENT=%%F
    FOR /F %%F IN ('"docker ps --all --quiet --filter=name=server"') DO SET MYAPPSERVER=%%F
    FOR /F %%F IN ('"docker ps --all --quiet --filter=name=redis"') DO SET REDIS=%%F
    FOR /F %%F IN ('"docker ps --all --quiet --filter=name=mongo"') DO SET MONGO=%%F

    if NOT [%MYAPPCLIENT%]==[] (
        docker stop %MYAPPCLIENT%
    )

    if NOT [%MYAPPSERVER%]==[] (
        docker stop %MYAPPSERVER%
    )

    if NOT [%REDIS%]==[] (
        docker stop %REDIS%
    )

    if NOT [%MONGO%]==[] (
        docker stop %MONGO%
    )

EXIT /B 0

:remove_stopped_containers 
    SET IDX=0
    FOR /F %%F IN ('"docker ps -a -f status=exited -q"') DO (
		docker rm %%F
        SET /A IDX+=1
    )

	if %IDX% GTR 0 (
		echo "Removed all stopped containers."
    ) else (
		echo "There are no stopped containers to be removed."
    )
EXIT /B 0

:remove_unused_volumes 
    SET /A IDX=0
    FOR /F %%F IN ('"docker volume ls -qf dangling=true"') DO (
		docker volume rm %%F
        SET /A IDX+=1
    )

	IF %IDX% GTR 0 (
		echo "Removed all unused volumes."
    ) else (
		echo "There are no unused volumes to be removed."
    )
EXIT /B 0