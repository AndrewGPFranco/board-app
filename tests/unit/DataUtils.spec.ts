import {expect, it} from "vitest";
import {parseDateFromDateToStringBR, parseDateFromStringToDateBR} from "@/utils/DataUtils";

it("Deve realizar o parse da data de String -> Date", () => {
    const result = parseDateFromStringToDateBR("28/06/2001");
    expect(result).toEqual(new Date(2001, 5, 28));
})

it("Deve realizar o parse da data de Date -> String", () => {
    const result: string = parseDateFromDateToStringBR(new Date(2025, 9, 10));
    expect(result).toEqual("10/10/2025");
})