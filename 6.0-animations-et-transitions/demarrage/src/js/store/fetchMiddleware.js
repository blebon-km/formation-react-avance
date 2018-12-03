export default store => next => action => {
    if ( action.request )
    {
        const { url, method, data, isMultipart, headers } = action.request;
        const options = { 
            method: isMultipart ? 'POST' : ( method || 'GET' ),
            headers: headers || {}
        };
        if ( isMultipart )
        {
            options.body = new FormData();
            for ( let name in data )
            {
                options.body.append( name, data[ name ] );
            }
        }
        else if ( method == 'POST' )
        {
            options.body = JSON.stringify( data );
            options.headers[ 'Content-Type' ] = 'application/json';
        }
        store.dispatch( { type: action.actions[ 0 ], data } );
        return fetch( url, options )
            .then( res => {
                if ( res.status.toString().match( /^2[0-9]{2}$/ ) )
                {
                    res.json().then( data => store.dispatch( { type: action.actions[ 1 ], data } ) );
                    
                }
                else
                {
                    res.json().then( error => store.dispatch( { type: action.actions[ 2], error } ) )
                }
            } )
            .catch( error => store.dispatch( { type: action.actions[ 2 ], error } ) )
    }
    return next(action);
}