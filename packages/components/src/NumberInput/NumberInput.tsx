import { Input } from '@grafana/ui';
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Properties
 */
interface Props extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'> {
  /**
   * on Change
   * @param value
   */
  onChange?: (value: number) => void;

  /**
   * Value
   *
   * @type {number}
   */
  value: number | string;

  /**
   * Step
   *
   * @type {number}
   */
  step?: number;

  /**
   * Min
   *
   * @type {min}
   */
  min?: number;

  /**
   * Max
   *
   * @type {max}
   */
  max?: number;
}

/**
 * Number Input
 */
export const NumberInput: React.FC<Props> = ({ value, onChange, min, max, step, ...restProps }) => {
  /**
   * Ref
   */
  const ref = useRef<HTMLInputElement>(null);

  /**
   * Local Value
   */
  const [localValue, setLocalValue] = useState(value?.toString() ?? '0');

  /**
   * On Change
   */
  const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.currentTarget.value);
  }, []);

  /**
   * On Save Value
   */
  const onSaveValue = useCallback(() => {
    let v = Number(localValue);

    if (Number.isNaN(v)) {
      v = 0;
    }

    if (step !== undefined && (v * 1000) % (step * 1000) !== 0) {
      v = 0;
    }

    if (max !== undefined && v > max) {
      v = max;
    } else if (min !== undefined && v < min) {
      v = min;
    }

    onChange?.(v);
    setLocalValue(v.toString());
  }, [localValue, max, min, onChange, step]);

  /**
   * On Key Down
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        ref.current?.blur();
      }
    },
    [onSaveValue]
  );

  /**
   * Update Local Value
   */
  useEffect(() => {
    setLocalValue(value?.toString() || '0');
  }, [value]);

  return (
    <Input
      ref={ref}
      {...restProps}
      type="text"
      value={localValue}
      onChange={onChangeValue}
      onBlur={onSaveValue}
      onKeyDown={onKeyDown}
    />
  );
};
