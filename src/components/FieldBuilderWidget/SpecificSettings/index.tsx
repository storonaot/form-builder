import { FC } from "react";
import { StringSettings } from "./StringSettings";
import { IntegerSettings } from "./IntegerSettings";
import { DecimalSettings } from "./DecimalSettings";
import { DateTimeSettings } from "./DateTimeSettings";

type SpecificSettingsProps = {
  fieldType: string;
};

export const SpecificSettings: FC<SpecificSettingsProps> = ({ fieldType }) => {
  switch (fieldType) {
    case "string":
      return <StringSettings />;
    case "integer":
      return <IntegerSettings />;
    case "decimal":
      return <DecimalSettings />;
    case "datetime":
      return <DateTimeSettings />;
  }

  return null;
};
