/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { GoogleAnalyticsFunnelForm, TGoogleAnalyticsFunnelForm } from "./types";
import CustomSelect from "./custom-select";
import CustomInput from "./custom-input";
import CustomRadio from "./custom-radio";
import { FunnelFormAction } from "./actions";
import CountryCombobox from "@/components/ui/country-combobox";
import { Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { DL___FormData } from "./datalayer";
import { useEffect } from "react";

function GoogleAnalyticsForm() {
  const router = useRouter();
  const form = useForm<TGoogleAnalyticsFunnelForm>({
    resolver: zodResolver(GoogleAnalyticsFunnelForm),
  });

  async function onSubmit(data: TGoogleAnalyticsFunnelForm) {
    if (typeof window !== "undefined") {
      console.log("Running");
      const email = localStorage.getItem("user_email") || "dummy@mail.test";
      if (email) {
        const result = await FunnelFormAction({ ...data, email });
        console.log(result);
        toast({
          variant: result?.success ? "default" : "destructive",
          title: "Joining to program",
          description: result?.message || "Thank you for your joining!",
        });
        if (result.success) {
          router.push("/joining/end?type=googleanalytics");
        }
        typeof window !== "undefined" &&
          DL___FormData(
            data,
            "joiningGoogleAnalyticsFormSubmission",
            "joining_google_analytics_form_submission"
          );
      }
    }
  }

  useEffect(() => {
    DL___FormData(
      form.getValues(),
      "joiningGoogleAnalyticsFormAbandoned",
      "joining_google_analytics_form_abandoned"
    );
  }, [form.getValues()]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 md:p-8 rounded-lg border-2 shadow-[2px_2px_20px_lightgray]"
      >
        <h4 className="font-semibold">
          Please, fill up the form so that you may get us in painpoint to
          resolve
        </h4>
        <CustomInput form={form} name="name" label="Your name" />
        <CustomInput form={form} name="websiteUrl" label="Website URL" />
        <FormField
          control={form.control}
          name="country"
          render={() => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <CountryCombobox
                onChange={(value: any) => {
                  console.log(value);
                  form.setValue("country", value.target.value);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomInput form={form} name="phone" label="Phone" />

        <CustomSelect
          form={form}
          name="industryType"
          label="What is your industry?"
          options={[
            {
              label: "Ecommerce",
              value: "Ecommerce",
            },
            {
              label: "Lead generation",
              value: "Lead generation",
            },
            {
              label: "Blog",
              value: "Blog",
            },
            {
              label: "SaaS",
              value: "SaaS",
            },
          ]}
        />

        <CustomInput
          form={form}
          name="challengesFaced"
          label="Have you ever run Google Ads campaigns before? If so, what were the biggest challenges you faced?"
          type="textarea"
        />

        <CustomRadio
          form={form}
          name="tools"
          label="Are you currently using any website analytics tools?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />

        {form.watch("tools") === "Yes" ? (
          <CustomInput
            form={form}
            name="toolsUsed"
            label="If yes, please make a list tools"
          />
        ) : null}

        <CustomInput
          form={form}
          name="goals"
          label="Briefly describe your top 2-3 goals for implementing GA4 & GTM. (e.g., Button Click, Ecommerce tracking,Form Submission etc.)"
          type="textarea"
        />

        {form.watch("goals") === "Others" ? (
          <CustomInput form={form} name="customGoals" label="Add your own" />
        ) : null}

        <CustomRadio
          form={form}
          name="xpGA4GTM"
          label="Do you have any experience with Google Analytics 4 or Google Tag Manager?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />

        <CustomSelect
          form={form}
          name="platformToSetup"
          label="Which platform do you need to set up tracking ?"
          options={[
            {
              label: "Google Ads Converstion",
              value: "Google Ads Converstion",
            },
            {
              label: "Google Analytics",
              value: "Google Analytics",
            },
            {
              label: "TikTok Pixel",
              value: "TikTok Pixel",
            },
            {
              label: "Facebook Pixel",
              value: "Facebook Pixel",
            },
          ]}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="items-center gap-2"
        >
          {form.formState.isSubmitting ? (
            <Sun className="w-4 h-4 animate-spin" />
          ) : null}
          {form.formState.isSubmitting ? "Submiting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default GoogleAnalyticsForm;
