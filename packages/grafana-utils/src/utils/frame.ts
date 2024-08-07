import { DataFrame, Field, FieldType } from '@grafana/data';

/**
 * Find field
 */
export const findField = <TValue = unknown>(
  series: DataFrame[],
  predicateFn: (field: Field, frame: DataFrame) => boolean
): Field<TValue> | undefined => {
  for (let i = 0; i < series.length; i += 1) {
    const frame = series[i];

    const field = frame.fields.find((field) => predicateFn(field, frame));

    /**
     * Field found
     */
    if (field) {
      return field;
    }
  }
};

/**
 * Get field values
 * @param series
 * @param fieldName
 * @param fieldType
 */
export const getFieldValues = <TValue>(series: DataFrame[], fieldName: string, fieldType?: FieldType): TValue[] => {
  const field = findField<TValue>(series, (field) => {
    const isTypeEqual = fieldType ? field.type === fieldType : true;

    return isTypeEqual && field.name === fieldName;
  });

  if (!field) {
    return [];
  }

  return field.values;
};

/**
 * Get last field value
 * @param series
 * @param fieldName
 * @param fieldType
 */
export const getLastFieldValue = <TValue>(series: DataFrame[], fieldName: string, fieldType?: FieldType): TValue => {
  const values = getFieldValues<TValue>(series, fieldName, fieldType);

  return values[values.length - 1];
};
