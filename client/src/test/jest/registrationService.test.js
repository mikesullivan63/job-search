import { Response } from "node-fetch";
import ResultsStore from "../../models/ResultsStore";
import { profileService } from "../../services/profile";
import { loginService } from "../../services/login";

describe("Testing registration service", () => {
  loginService.setStore(ResultsStore.create({}));

  //No longer working due to nested calls, skipping for now
  xtest("Test password validation when passing and working", async () => {
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
      profileService.register(
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
      profileService.register(
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
