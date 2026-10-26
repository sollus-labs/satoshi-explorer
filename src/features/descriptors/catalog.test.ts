import { describe, expect, it } from "vitest";
import {
  descriptorProfiles,
  findDescriptor,
  getLessonProgress,
  lessonSteps,
} from "./catalog";

describe("conteúdo didático de descriptors", () => {
  it("oferece modelos visivelmente ilustrativos para quatro famílias", () => {
    expect(descriptorProfiles.map((profile) => profile.id)).toEqual([
      "wpkh",
      "sh-wpkh",
      "tr",
      "wsh-multisig",
    ]);
    expect(
      descriptorProfiles.every(
        (profile) =>
          profile.sample.includes("DEMO") || profile.sample.includes("XPUB_"),
      ),
    ).toBe(true);
    expect(
      descriptorProfiles.every((profile) => profile.parts.length >= 3),
    ).toBe(true);
  });

  it("explica que Taproot também pode incluir árvore de scripts", () => {
    expect(findDescriptor("tr").explanation).toContain("árvore de scripts");
  });

  it("oferece quatro etapas e calcula progresso sem contar duplicatas", () => {
    expect(lessonSteps).toHaveLength(4);
    expect(getLessonProgress([], 4)).toBe(0);
    expect(getLessonProgress([0, 1, 1], 4)).toBe(50);
    expect(getLessonProgress([0, 1, 2, 3], 4)).toBe(100);
    expect(getLessonProgress([0], 0)).toBe(0);
  });
});
