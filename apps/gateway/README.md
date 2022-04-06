# Resource mapping

The following table is a representation of the mapping between the public gateway URLs and the internal microservices URLs.

| source        | destination                    |
| :------------ | :----------------------------- |
| /devices      | devices:3000/devices           |
| /devices/auth | devices-auth:3000/auth/sign-in |
| /auth         | auth:3000/auth/sign-in         |

# Usage

In the devlopment environment, the gateway uses the :8080 port on the host computer.
In order to reach, for example, the devices API : `localhost:8080/devices`
