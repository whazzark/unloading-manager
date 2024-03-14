import { DependencyType } from "./types";

import type { Dependency, EnumValues } from "./types";
import type { FieldValues, UseFormWatch } from "react-hook-form";
import type { z } from "zod";

export interface ResolveDependenciesReturnType {
  isDisabled: boolean;
  isHidden: boolean;
  isRequired: boolean;
  overrideOptions?: EnumValues;
}

export function resolveDependencies<T extends z.infer<z.ZodObject<any, any>>>(
  dependencies: Dependency<T>[],
  currentFieldName: keyof T,
  watch: UseFormWatch<FieldValues>,
): ResolveDependenciesReturnType {
  let isDisabled = false;
  let isHidden = false;
  let isRequired = false;
  let overrideOptions: EnumValues | undefined;

  const currentFieldValue = watch(currentFieldName as string);

  const currentFieldDependencies = dependencies.filter((dependency) => {
    return dependency.targetField === currentFieldName;
  });

  currentFieldDependencies.forEach((dependency) => {
    const watchedValue = watch(dependency.sourceField as string);
    const conditionMet = dependency.when(watchedValue, currentFieldValue);

    switch (dependency.type) {
      case DependencyType.DISABLES: {
        if (conditionMet) {
          isDisabled = true;
        }
        break;
      }
      case DependencyType.REQUIRES: {
        if (conditionMet) {
          isRequired = true;
        }
        break;
      }
      case DependencyType.HIDES: {
        if (conditionMet) {
          isHidden = true;
        }
        break;
      }
      case DependencyType.SETS_OPTIONS: {
        if (conditionMet) {
          overrideOptions = dependency.options;
        }
        break;
      }

      default: {
        break;
      }
    }
  });

  const ret: ResolveDependenciesReturnType = {
    isDisabled,
    isHidden,
    isRequired,
    overrideOptions,
  };

  return ret;
}
