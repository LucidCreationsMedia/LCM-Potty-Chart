import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  VStack
} from "@chakra-ui/react";
import {
  Formik,
  // FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik";
import { format } from "date-fns";
import findValidDateRange from "../../../lib/findValidDateRange";
import FormValidateEmoji from "./FormValidateEmoji";

interface DatePickerProps {
  isLoading: boolean;
  title: string;
}

/**
 * @param {boolean} isLoading is the component loading?
 * @param {string} title the title for the current date.
 */

const DatePicker = ({ title, isLoading }: DatePickerProps): JSX.Element => {
  const router = useRouter();

  const [valid, setValid] = useState<boolean>(false);

  const validDateRange = findValidDateRange();

  const validateDate = (
    dateString?: string | undefined
  ): string | undefined => {
    let dateError;

    if (dateString) {
      const dateArr = dateString.split("-");
      if (dateArr.length !== 3) {
        dateError = "Please select a date.";
        setValid(false);
      } else if (dateArr.length === 3) {
        const date: UpdateCalenderPropsDateLayout = {
          year: parseInt(dateArr[0]),
          month: parseInt(dateArr[1]),
          day: parseInt(dateArr[2])
        };

        if (!/^(19|20)\d{2}$/.test(`${date.year}`)) {
          dateError = "Please use a year between 1900 and 2099";
          setValid(false);
        }

        if (date.month < 1 || date.month > 12) {
          dateError = "Please use a month between 1 and 12";
          setValid(false);
        }

        if (date.day < 1 || date.day > 31) {
          dateError = "Please use a day between 1 and 31";
          setValid(false);
        }

        setValid(true);
      } else {
        setValid(true);
      }
    } else if (dateString.length === 0) {
      dateError = "Please select a date.";
      setValid(false);
    } else {
      setValid(true);
    }

    return dateError;
  };

  const handleSubmit = (formInput?: { date?: string }): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      if (formInput.date) {
        if (!validateDate(formInput.date)) {
          const dateArr = formInput.date.split("-");
          const date: UpdateCalenderPropsDateLayout = {
            year: parseInt(dateArr[0]),
            month: parseInt(dateArr[1]),
            day: parseInt(dateArr[2])
          };

          return resolve(router.push(`/calendar/${date.year}/${date.month}`));
        } else {
          return reject("Error validating date.");
        }
      } else {
        return reject("Date not provided.");
      }
    });
  };

  // Field theme
  const fieldTheme = {
    width: "auto",
    bg: "gray.900",
    borderColor: "white",
    _placeholder: {
      color: "white"
    },
    _focus: {
      bg: "#000",
      color: "#FFF",
      borderColor: "#63b3ed",
      boxShadow: "0 0 0 1px #63b3ed",
      zIndex: "1"
    }
  };

  const initRef = useRef();

  return (
    <Popover placement="bottom" initialFocusRef={initRef}>
      <PopoverTrigger>
        <Button border="none" variant="outline">
          {isLoading ? (
            <Skeleton>
              <Heading w="100%" h="auto">
                {title}
              </Heading>
            </Skeleton>
          ) : (
            <Heading w="100%" h="auto">
              {title}
            </Heading>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader py={2} fontWeight="semibold">
          <Heading size="md" as="h3">
            {"Choose a Date"}
          </Heading>
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody textAlign="center">
          <Formik
            initialValues={{
              date: ""
            }}
            onSubmit={(data, actions) => {
              handleSubmit(data)
                .then(() => {
                  actions.setSubmitting(false);
                  actions.resetForm({
                    values: {
                      date: ""
                    }
                  });
                })
                .catch(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {(
              formProps: FormikProps<{
                date: string;
              }>
            ) => (
              <Form
                style={{
                  width: "100%",
                  height: "auto"
                }}
              >
                <VStack
                  alignItems="center"
                  alignContent="flex-start"
                  w="100%"
                  h="auto"
                  spacing={6}
                  py={4}
                >
                  <Heading as="h4" size="sm" fontWeight="semibold">
                    {"Required fields indicated with"}
                    <FormValidateEmoji type="Required" />
                  </Heading>
                  <Field name="date" validate={validateDate}>
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          form.errors.date && form.touched.date ? true : false
                        }
                      >
                        <VStack
                          alignContent="center"
                          alignItems="center"
                          spacing={2}
                          w="100%"
                          h="auto"
                        >
                          <HStack
                            alignContent="center"
                            alignItems="center"
                            pl={4}
                            w="100%"
                            h="auto"
                            spacing={2}
                          >
                            <FormLabel fontWeight="semibold" htmlFor="date">
                              {"Date:"}
                            </FormLabel>
                            <Input
                              required
                              {...fieldTheme}
                              type="date"
                              isDisabled={formProps.isSubmitting}
                              {...field}
                              id="date"
                              textAlign="center"
                              min={format(validDateRange.start, "yyyy-MM-dd")}
                              max={format(validDateRange.end, "yyyy-MM-dd")}
                              {...(!form.errors.date && form.touched.date
                                ? {
                                    borderColor: "brand.valid",
                                    boxShadow: "0 0 0 1px #00c17c",
                                    _hover: {
                                      borderColor: "brand.valid",
                                      boxShadow: "0 0 0 1px #00c17c"
                                    }
                                  }
                                : "")}
                            />
                            {!form.touched.date && (
                              <FormValidateEmoji type="Required" />
                            )}
                            {form.errors.name && form.touched.date && (
                              <FormValidateEmoji type="Error" />
                            )}
                            {!form.errors.name && form.touched.date && (
                              <FormValidateEmoji type="Valid" />
                            )}
                          </HStack>
                          <FormErrorMessage>
                            {typeof form.errors.date === "string" &&
                              form.errors.date}
                          </FormErrorMessage>
                        </VStack>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    isDisabled={!valid}
                    background={valid ? "brand.valid" : "brand.danger"}
                    isLoading={formProps.isSubmitting}
                    type="submit"
                  >
                    {"Select this date"}
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
