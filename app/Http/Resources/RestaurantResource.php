<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'tel_number' => $this->tel_number,
            'is_accepting_orders' => $this->is_accepting_orders,
            'is_banned' => $this->is_banned,
            'is_confirmed' => $this->is_confirmed,
            'is_working' => $this->is_working,
            'worktime' => $this->worktime,
            'tags' => RestaurantTagResource::collection($this->whenLoaded('tags')),
            'geolocation' => new GeolocationResource($this->whenLoaded('geolocation')),
        ];
    }
}
