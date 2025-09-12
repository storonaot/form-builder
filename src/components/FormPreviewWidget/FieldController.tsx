import { FC } from "react";
import { FieldSchema } from "../types.ts";

type Props = {
  field: FieldSchema;
};

export const FieldController: FC<Props> = ({ field }) => {
  return (
    <div>
      <div>{field.label}</div>
      <div>{field.type}</div>
    </div>
  );
};
