import { FC } from "react";
import { FieldSettingsData } from "../types.ts";

type Props = {
  field: FieldSettingsData;
};

export const FieldController: FC<Props> = ({ field }) => {
  return (
    <div>
      <div>{field.label}</div>
      <div>{field.type}</div>
    </div>
  );
};
