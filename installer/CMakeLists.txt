set(CPACK_PACKAGE_NAME "${CMAKE_PROJECT_NAME}")
set(CPACK_PACKAGE_CONTACT "${PROJECT_MAINTAINER}")
set(CPACK_PACKAGE_VERSION ${greenrooms_VERSION})
set(CPACK_PACKAGE_VERSION_MAJOR ${greenrooms_VERSION_MAJOR})
set(CPACK_PACKAGE_VERSION_MINOR ${greenrooms_VERSION_MINOR})
set(CPACK_PACKAGE_VERSION_PATCH ${greenrooms_VERSION_PATCH})
set(CPACK_PACKAGE_VENDOR ${PROJECT_VENDOR})
set(CPACK_PACKAGE_DESCRIPTION_SUMMARY ${PROJECT_DESCRIPTION_SUMMARY})
set(CPACK_PACKAGE_DESCRIPTION ${PROJECT_DESCRIPTION})
set(CPACK_RESOURCE_FILE_LICENSE "${CMAKE_SOURCE_DIR}/LICENSE")
set(CPACK_RESOURCE_FILE_README "${CMAKE_SOURCE_DIR}/README.md")
set(CPACK_RESOURCE_FILE_WELCOME "${CMAKE_SOURCE_DIR}/README.md")

set(CPACK_PACKAGE_FILE_NAME
    "${PROJECT_NAME}-${CPACK_PACKAGE_VERSION}-${CMAKE_BUILD_TYPE}-${CMAKE_SYSTEM_NAME}-${PROJECT_ARCH}"
)
if(CMAKE_BUILD_TYPE STREQUAL "Release")
  set(CPACK_STRIP_FILES ON)
endif()

if(PACKAGE_TGZ)
  set(CPACK_INCLUDE_TOPLEVEL_DIRECTORY OFF)
endif(PACKAGE_TGZ)

include(CPack)
