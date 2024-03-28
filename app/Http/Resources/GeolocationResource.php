<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GeolocationResource extends JsonResource
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
            'formatted_address' => $this->formatted_address,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'name' => $this->name,
            'place_id' => $this->place_id,
        ];
    }
}
