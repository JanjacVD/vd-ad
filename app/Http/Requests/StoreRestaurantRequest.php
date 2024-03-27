<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'string'],
            "address" => ['required', 'string'],
            "tel_number" => ['required', 'string'],
            "location.place_id" => ['required', 'string'],
            "location.formatted_address" => ['required', 'string'],
            "location.lat" => ['required', 'numeric'],
            "location.lng" => ['required', 'numeric'],
            "tags" => ['required', 'array'],
            "tags.*" => ['required', 'numeric'],
            "worktime" => ['required', 'array'],
            "worktime.*.from_time" => ['nullable', 'date_format:H:i'],
            "worktime.*.to_time" => ['nullable', 'date_format:H:i'],
        ];
    }
}
