import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = (control.value || '').replace(/\D/g, '');

  if (!cpf) return null;

  // CPF deve ter 11 dígitos
  if (cpf.length !== 11) return { cpfInvalido: true };

  // Elimina CPFs inválidos conhecidos
  if (/^(\d)\1+$/.test(cpf)) return { cpfInvalido: true };

  // Validação dos dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return { cpfInvalido: true };

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return { cpfInvalido: true };

  return null; // CPF válido
}
