import {expect, it} from "vitest";
import {parseDateBR} from "@/utils/DataUtils";

it("Deve realizar o parse da data de String -> Date", () => {
    const result = parseDateBR("28/06/2001");
    expect(result).toEqual(new Date(2001, 5, 28));
})