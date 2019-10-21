import { Response } from "node-fetch";
import ResultsStore from "../../models/ResultsStore";
import { registrationService } from "../../services/registration";
import { loginService } from "../../services/login";

describe("Testing registration service", () => {
  loginService.setStore(ResultsStore.create({}));

  test("Test password validation when failing", async () => {
    //let promise = registrationService.register("", "", "", "", "");
    await expect(
      registrationService.register("", "", "", "", "")
    ).rejects.toContain("Passwords must be between 8 and 64 characters");

    await expect(
      registrationService.register("", "", "", "abc", "def")
    ).rejects.toContain("Passwords do not match");

    await expect(
      registrationService.register("", "", "", "abcdefg", "abcdefg")
    ).rejects.toContain("Passwords must be between 8 and 64 characters");

    await expect(
      registrationService.register("", "", "", "abcdefgh", "abcdefgh")
    ).rejects.toContain(
      "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
    );

    await expect(
      registrationService.register("", "", "", "abcdefgH", "abcdefgH")
    ).rejects.toContain(
      "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
    );

    await expect(
      registrationService.register("", "", "", "abcdefgH1", "abcdefgH1")
    ).rejects.toContain(
      "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
    );
  });

  test("Test password validation when passing and working", async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(
          new Response(
            JSON.stringify({
              token: "1234567890123456789012345678901234567890"
            })
          )
        );
      });
    });

    await expect(
      registrationService.register(
        "7987987",
        "8789797",
        "87897997897",
        "abcdefgH1!",
        "abcdefgH1!"
      )
    ).resolves.toMatchObject({
      token: "1234567890123456789012345678901234567890"
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      "/user/register",
      expect.anything()
    );
    global.fetch.mockClear();
  });

  test("Test password validation when passing and failing", async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject("DB is down");
      });
    });

    await expect(
      registrationService.register(
        "8987897 89",
        "897987897987",
        "897987897",
        "abcdefgH1!",
        "abcdefgH1!"
      )
    ).rejects.toEqual("DB is down");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "/user/register",
      expect.anything()
    );
    global.fetch.mockClear();
  });
});
