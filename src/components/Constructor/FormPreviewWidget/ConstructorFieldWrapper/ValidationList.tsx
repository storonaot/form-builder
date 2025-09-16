import { FC } from "react";
import { FieldSchema } from "../../types";
import { getValidationInfo } from "./get-validation-info";

type Props = {
  field: FieldSchema;
};

export const ValidationList: FC<Props> = ({ field }) => {
  const validations = getValidationInfo(field);

  return (
    <div className="flex flex-col items-start gap-1 w-32">
      {validations.length > 0 ? (
        validations.map((validation, index) => (
          <span key={index} className="text-xs text-gray-500">
            {validation}
          </span>
        ))
      ) : (
        <span className="text-xs text-gray-400">—</span>
      )}
    </div>
  );
};
