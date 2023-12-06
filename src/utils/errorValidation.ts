export const getValidationErrorMessage = (
  errors: any,
): string => Object.keys(errors).map((key: string) => {
  const { kind, path, properties } = errors[key];

  switch (kind) {
    case 'enum':
      return `Значение поля '${path}' должно быть одним из допустимых: ${properties.enumValues.join(', ')}.`;
    case 'unique':
      return `Значение поля '${path}' должно быть уникальным и уже существует в базе данных.`;
    case 'minlength':
      return `Длина поля '${path}' должна быть не менее ${properties.minlength} символов.`;
    case 'maxlength':
      return `Длина поля '${path}' должна быть не более ${properties.maxlength} символов.`;
    case 'required':
      return `Поле '${path}' является обязательным и не может быть пустым.`;
    case 'type':
      return `Значение поля '${path}' должно быть типа ${properties.type}.`;
    case 'min':
      return `Значение поля '${path}' должно быть не менее ${properties.min}.`;
    case 'max':
      return `Значение поля '${path}' должно быть не более ${properties.max}.`;
    default:
      return `Поле '${path}' содержит некорректное значение.`;
  }
}).join(' ');
