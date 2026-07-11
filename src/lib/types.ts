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
  ticketId: "SOUND_HEALING" | "SOUND_HEALING_ICE_BATH" | "";
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
