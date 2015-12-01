# iTunesConnectProxy

A proxy providing basic auth &amp; REST interface for [iTunesConnect portal](https://itunesconnect.apple.com).

# Usage

`GET /total-downloads` - Returns number of units downloaded grouped by application for the last day.  
`GET /total-downloads/{interval}` - Returns number of units downloaded grouped by application for last `{interval}` days.

# Development

    # Build image
    docker build --rm=true -t itcp .

    # Run container
    docker run --name=itcp -p 3001:3001 -v $PWD/./:/usr/src/app -ti itcp

# Authors

- [Jan Haložan](https://github.com/JanHalozan)
- [Oto Brglez](https://github.com/otobrglez)
