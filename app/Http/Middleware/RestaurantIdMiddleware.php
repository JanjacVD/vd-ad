<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestaurantIdMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!empty(auth()->user())) {
            setPermissionsTeamId(session('restaurant_id'));
        }
        // if (!empty(auth('api')->user())) {
        //     //  `getTeamIdFromToken()` example of custom method for getting the set team_id 
        //     setPermissionsTeamId(null);
        // }

        return $next($request);
    }
}
