export type YesNo = "Yes" | "No";

export interface Stage1Data {
  fullName: string;
  age: string;
  city: string;
  email: string;
  contactNumber: string;
}

export interface Stage2Data {
  hasMedicalCondition: YesNo | "";
  medicalConditionDetails: string;
  onMedication: YesNo | "";
  medicationDetails: string;
  consentAgreed: boolean;
}

export interface Stage3Data {
  ticketId: "ONE_DAY_RETREAT" | "";
  utr: string;
  screenshotFile: File | null;
  screenshotBase64: string;
  screenshotName: string;
}

export interface RegistrationFormState {
  stage1: Stage1Data;
  stage2: Stage2Data;
  stage3: Stage3Data;
}

/** Step 2 of the one-to-one booking. `hour` is the slot's IST start hour. */
export interface AppointmentData {
  date: string; // YYYY-MM-DD
  hour: number | null;
}

export interface OneToOneFormState {
  stage1: Stage1Data;
  appointment: AppointmentData;
}

export interface OneToOneLeadRequestBody {
  bookingId: string;
  fullName: string;
  age: number;
  city: string;
  email: string;
  contactNumber: string;
}

export interface OneToOneRequestBody extends OneToOneLeadRequestBody {
  date: string;
  hour: number;
  website?: string; // honeypot
}

export interface OneToOneSuccessResponse {
  success: true;
  fullName: string;
  date: string;
  hour: number;
}

export interface OneToOneErrorResponse {
  success: false;
  error: string;
}

export type OneToOneResponse = OneToOneSuccessResponse | OneToOneErrorResponse;

export interface RegisterRequestBody {
  fullName: string;
  age: number;
  city: string;
  email: string;
  contactNumber: string;
  hasMedicalCondition: YesNo;
  medicalConditionDetails: string | null;
  onMedication: YesNo;
  medicationDetails: string | null;
  consentAgreed: boolean;
  ticketType: string;
  amount: number;
  utr: string | null;
  screenshotBase64: string;
  screenshotName: string;
  website?: string; // honeypot
}

export interface LeadRequestBody {
  leadId: string;
  fullName: string;
  age: number;
  city: string;
  email: string;
  contactNumber: string;
}

export interface ContactFormState {
  fullName: string;
  email: string;
  contactNumber: string;
  subject: string;
  message: string;
}

export interface ContactRequestBody extends ContactFormState {
  website?: string; // honeypot
}

export interface ContactResponse {
  success: boolean;
  error?: string;
}

export interface RegisterSuccessResponse {
  success: true;
  registrationNo: string;
  ticketType: string;
  amount: number;
  fullName: string;
}

export interface RegisterErrorResponse {
  success: false;
  error: string;
}

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;
