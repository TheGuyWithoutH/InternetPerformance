@echo off 

set CLEAN=clean
set RUN=run
set STOP=stop

set DEV=dev
set PROD=prod

set argC=0
for %%x in (%*) do Set /A argC+=1

if %argC% EQU 0 OR IF [%1]==[-h] OR IF [%1]==[--help] (
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
    CALL :run
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
    if ["$#" -eq 4] AND [ $2 = "-mode" ] AND [ $3 = $PROD ](
        docker-compose -f docker-compose.prod.yml up
    ) else if ["$#" -eq 4] && [ $2 = "-mode" ] && [ $3 = $DEV ] (
        docker-compose up -d
    ) else (
        echo Invalid mode. Use -mode %PROD% or -mode %DEV%
    )
EXIT /B 0

:stop_existing
    @REM Do_something    
EXIT /B 0

:remove_stopped_containers 
    @REM Do_something    
EXIT /B 0

:remove_unused_volumes 
    @REM Do_something    
EXIT /B 0