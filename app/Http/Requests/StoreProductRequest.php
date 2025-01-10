<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{

    public function authorize(): bool
    {

        return true;
    }


    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'active' => 'required|boolean',
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'O campo nome é obrigatório.',
            'description.required' => 'O campo descrição é obrigatório.',
            'price.required' => 'O campo preço é obrigatório.',
            'quantity.required' => 'O campo quantidade é obrigatório.',
            'active.required' => 'O campo ativo é obrigatório.',
        ];
    }
}
