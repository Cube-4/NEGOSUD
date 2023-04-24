import { Select, TextInput, Box } from "@mantine/core";
export function TextAndSelect({
  classes,
  textLabel,
  selectLabel,
  textPlaceholder,
  selectPlaceholder,
  selectData,
  textInputType,
}: any) {
  return (
    <>
      <Box>
        <Select
          data={selectData}
          placeholder={selectPlaceholder}
          label={selectLabel}
          classNames={classes}
        />
      </Box>
      <Box w="100%">
        <TextInput
          type={textInputType}
          label={textLabel}
          placeholder={textPlaceholder}
          classNames={classes}
        />
      </Box>
    </>
  );
}
