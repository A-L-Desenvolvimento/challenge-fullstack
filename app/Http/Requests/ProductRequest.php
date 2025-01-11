<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'name' => 'required|string',
            'description' => 'string',
            'price' => 'required|numeric|gt:0',
            'quantity' => 'required|integer|min:0',
            'active' => 'boolean'
        ];
    }

    /**
     * Mensagens personalizadas para os erros de validacao
     */
    public function messages()
    {
        return [
            'name.required' => 'Nome é obrigatório.',
            'name.string' => 'Nome deve ser uma string.',
            'description.string' => 'Descrição deve ser uma string.',
            'price.required' => 'Preço é obrigatório.',
            'price.numeric' => 'Preço deve ser um número.',
            'price.gt' => 'Preço deve ser maior do que zero.',
            'quantity.required' => 'Quantidade é obrigatório.',
            'quantity.integer' => 'Quantidade deve ser um número inteiro.',
            'quantity.min' => 'Quantidade deve ser no mínimo zero.',
            'active.boolean' => 'Status deve ser verdadeiro ou falso.',
        ];
    }
}
