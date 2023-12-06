"use client";
import ReCAPTCHA from "react-google-recaptcha";
import SectionHead from "@/components/molecule/section-head";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMessages from "@/components/molecule/errors-messages";

import Loader from "@/components/molecule/loader";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ShortReviews from "@/components/molecule/short-reviews";
import CountryCombobox from "@/components/ui/country-combobox";

const GetAQuotePage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    country: "",
    companyName: "",
    companyURL: "",
    budgetRange: "",
    services: [],
    message: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [captcha, setCaptcha] = useState(false);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOnSubmit = () => {
    setLoading(true);
    const validationErrors = validation();

    if (Object.keys(validationErrors).length === 0) {
      try {
        // SendEmail(formData);
        console.log(formData)
        toast({
          title: "Message Sending",
          description: "Successful!",
        });
        setLoading(false);
        setTimeout(() => {
          if (window) {
            window.location.reload();
          }
        }, 3000);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Messange Sending",
          description: "Something went wrong!",
        });
      }
    } else {
      setErrors(validationErrors);
    }

    setLoading(false);
  };
  const validation = () => {
    let obj: any = {};
    if (!formData.name.trim()) {
      obj.name = "Name is required!";
    }
    if (!formData.email.trim()) {
      obj.email = "Email is required!";
    }
    if (!formData.phone.trim()) {
      obj.phone = "Phone is required!";
    }
    if (!formData.message.trim()) {
      obj.message = "Message is required!";
    }
    if (
      formData.services.length < 1 ||
      (formData.services.length > 1 && !Array.isArray(formData.services))
    ) {
      obj.services = "Choose at least one!";
    }

    if (currentTab !== 1) {
      if (!formData.budgetRange.trim()) {
        obj.budgetRange = "Budget range is required!";
      }
    }

    return obj;
  };
  return (
    <>
      <div className="bg-[url('/images/backgrounds/CircleNest.svg')] bg-cover bg-center">
        <div className="section container">
          <SectionHead
            highlighter=""
            H2={<>Get a Quote</>}
            paragraphs={[
              <>
                Embark on a transformative digital journey with Sociomatic. Our
                tailored solutions redefine success, ensuring your brand&apos;s
                unique needs are precisely met. Request a quote today and
                witness the power of strategic innovation, elevating your brand
                to new heights in the dynamic digital landscape.
              </>,
            ]}
          />
        </div>

        <div className="relative container section grid grid-cols-1 md:grid-cols-2 large-gap backdrop-blur rounded-lg border border-secondarymuted">
          <div className="absolute top-0 left-0 w-full -mt-[20px] md:-mt-[25px]">
            <ul className="flex items-center justify-center">
              {["One Time", "Quarterly", "Yearly"].map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`px-4 py-2 md:px-8 md:py-3 border  font-bold cursor-pointer ${
                      index + 1 === currentTab
                        ? "bg-secondary text-white hover:bg-blue-600 border-secondary "
                        : "bg-white hover:bg-muted hover:text-secondary border-secondarymuted "
                    } ${index + 1 === 1 ? "rounded-l-[10px]" : ""} ${
                      index + 1 === 3 ? "rounded-r-[10px]" : ""
                    } ${
                      index + 1 === 2
                        ? "border border-l-0 border-r-0"
                        : "border"
                    } transition ease-in-out duration-300`}
                    onClick={() => setCurrentTab(index + 1)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col small-gap">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">
                Name <span className="text-pink-600 font-bold">*</span>
              </Label>
              <Input
                type="name"
                id="name"
                placeholder="Name"
                name="name"
                onChange={handleOnChange}
              />
              <ErrorMessages errors={errors} name="name" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">
                Email <span className="text-pink-600 font-bold">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleOnChange}
              />
              <ErrorMessages errors={errors} name="email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">
                Phone <span className="text-pink-600 font-bold">*</span>
              </Label>
              <Input
                type="phone"
                id="phone"
                placeholder="Phone"
                name="phone"
                onChange={handleOnChange}
              />
              <ErrorMessages errors={errors} name="phone" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="country">Country</Label>
              <CountryCombobox onChange={handleOnChange} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                type="companyName"
                id="companyName"
                placeholder="Company Name"
                name="companyName"
                onChange={handleOnChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="companyURL">Company URL</Label>
              <Input
                type="companyURL"
                id="companyURL"
                placeholder="Company URL"
                name="companyURL"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-col small-gap overflow-hidden">
            {currentTab !== 1 ? (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="budget">
                  Probable budget range&nbsp;
                  <span className="text-pink-600 font-bold">*</span>
                </Label>
                <Select
                  onValueChange={(value) => {
                    handleOnChange({
                      target: {
                        name: "budgetRange",
                        value,
                      },
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$1000-1500">$1000-1500</SelectItem>
                    <SelectItem value="$1500-2000">$1500-2000</SelectItem>
                    <SelectItem value="$2500+">$2500+</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessages errors={errors} name="budgetRange" />
              </div>
            ) : null}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">
                Services you are interested on&nbsp;
                <span className="text-pink-600 font-bold">*</span>
              </Label>
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
                {ServicesList.map((item: any) => {
                  return (
                    <li key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.name}
                        onCheckedChange={(value) =>
                          setFormData({
                            ...formData,
                            services: value
                              ? [...formData.services, item.value]
                              : [
                                  ...formData.services.filter(
                                    (service: any) => service !== item.value
                                  ),
                                ],
                          })
                        }
                      />
                      <label
                        htmlFor={item.name}
                        className="peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.value}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <ErrorMessages errors={errors} name="services" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">
                Your message&nbsp;
                <span className="text-pink-600 font-bold">*</span>
              </Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                name="message"
                onChange={handleOnChange}
              />
              <ErrorMessages errors={errors} name="message" />
            </div>
            <ReCAPTCHA
              sitekey={process.env.siteKey!}
              onChange={(e: any) => {
                console.log(e);
                e ? setCaptcha(true) : setCaptcha(false);
              }}
            />
            <Button
              variant={"secondary"}
              className="mt-5 max-w-[300px]"
              disabled={!captcha}
              onClick={handleOnSubmit}
            >
              {loading ? <Loader /> : "Submit"}
            </Button>
          </div>
        </div>
      </div>
      <ShortReviews />
    </>
  );
};
export default GetAQuotePage;
const ServicesList = [
  {
    id: 1,
    value: "Google Paid Ads",
    name: "googlePaidAds",
  },
  {
    id: 2,
    value: "Data Analytics",
    name: "dataAnalytics",
  },
  {
    id: 3,
    value: "Custom Web Development",
    name: "customWebDevelopment",
  },
  {
    id: 4,
    value: "Wordpress Development",
    name: "wordpressDevelopment",
  },
  {
    id: 5,
    value: "Social Media Paid Ads",
    name: "socialMediaPaidAds",
  },
  {
    id: 6,
    value: "Software Development",
    name: "softwareDevelopment",
  },
  {
    id: 7,
    value: "Shopify Store Development",
    name: "shopifyStoreDevelopment",
  },
  {
    id: 8,
    value: "UI/UX & Graphic Design",
    name: "uiUxAndGraphicDesign",
  },
];
