# Resource mapping

The following table is a representation of the mapping between the public gateway URLs and the internal microservices URLs.

| source        | destination                    |
| :------------ | :----------------------------- |
| /devices      | devices:3000/devices           |
| /devices/auth | devices-auth:3000/auth/sign-in |
| /auth         | auth:3000/auth/sign-in         |
