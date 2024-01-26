"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      range: 16,
      lowercase: true,
    },
  });

  const [password, setPassword] = useState(null);

  function secureMathRandom() {
    return (
      window.crypto.getRandomValues(new Uint32Array(1))[0] /
      (Math.pow(2, 32) - 1)
    );
  }

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
  }
  function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  const randomFunc = {
    lowercase: getRandomLower,
    uppercase: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbol,
  };

  function autoResize() {
    const input = document.getElementById('passwordinput')
    console.log(input);
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
  }

  const onSubmit = (data) => {
    const { lowercase, numbers, symbols, uppercase, range } = data;
    if (!lowercase && !numbers && !symbols && !uppercase) {
      toast.error("Please select atleast one option", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    let tempKeys = [];
    let temppassword = [];
    for (let x = 0; x < range; x++) {
      if (lowercase) tempKeys.push(randomFunc.lowercase());
      if (uppercase) tempKeys.push(randomFunc.uppercase());
      if (numbers) tempKeys.push(randomFunc.numbers());
      if (symbols) tempKeys.push(randomFunc.symbols());
      let key = Math.floor(Math.random() * tempKeys.length);
      // console.log(key);
      temppassword.push(tempKeys[key]);
    }
    const pass = temppassword.join("");
    setPassword(pass);
    setValue("password", pass);
  };

  useEffect(() => {
    if(!!password) autoResize()
  }, [password])

  const copyPassword = (e) => {
    e.preventDefault();
    e.target.select();
    window.navigator.clipboard
      .writeText(e.target.value)
      .then(() => {
        toast.success("Password copied", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch(() => { });
  };

  return (
    <section className="py-5 flex items-center md:min-h-full overflow-auto">
      <div className="container mx-auto px-3">
        <div className="flex justify-center">
          <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/3">
            <div className="bg-sky-900 p-5 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5">
                  <div>
                    <h1 className="text-center text-white text-2xl">
                      Password Generator
                    </h1>
                  </div>
                  <div className="bg-sky-800 rounded-lg p-3">
                    {!!password ? (
                      <textarea
                        {...register("password", {})}
                        className="resize-none bg-transparent text-center w-full text-2xl text-white tracking-widest outline-0 font-bold"
                        onClick={(e) => copyPassword(e)}
                        readOnly
                        rows={1}
                        id="passwordinput"
                      ></textarea>
                    ) : (
                      <div className="text-gray-400 text-sm tracking-widest text-white uppercase text-center">
                        Click Generate
                      </div>
                    )}
                  </div>
                  <div className="">
                    <label className="text-gray-400 mb-2 block text-xs uppercase tracking-widest">
                      Length: <b>{watch("range")}</b>
                    </label>
                    <div className="bg-sky-800 text-sky-200 rounded-lg p-3 text-white uppercase tracking-wider text-center">
                      <div className="flex gap-3 items-center">
                        <div className="shrink-0">4</div>
                        <div className="grow">
                          <input
                            type="range"
                            min="4"
                            max="32"
                            {...register("range", {
                              min: 4,
                              max: 32,
                            })}
                            className="w-full block"
                          />
                        </div>
                        <div className="shrink-0">32</div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label className="text-gray-400 mb-2 block text-xs uppercase tracking-widest">
                      Settings
                    </label>
                    <div className="flex flex-col gap-3">
                      <div className="bg-sky-800 text-sky-200 rounded-lg  text-white tracking-wider text-center">
                        <label
                          htmlFor="toggleB"
                          className="flex items-center cursor-pointer justify-between p-3"
                        >
                          <div className="mr-3 text-white font-medium">
                            Include Lowercase
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggleB"
                              className="sr-only"
                              {...register("lowercase")}
                            />
                            <div className="block bg-gray-500 w-14 h-8 rounded-full dotbg"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                      <div className="bg-sky-800 text-sky-200 rounded-lg  text-white tracking-wider text-center">
                        <label
                          htmlFor="toggleA"
                          className="flex items-center cursor-pointer justify-between p-3"
                        >
                          <div className="mr-3 text-white font-medium">
                            Include Uppercase
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggleA"
                              className="sr-only"
                              {...register("uppercase")}
                            />
                            <div className="block bg-gray-500 w-14 h-8 rounded-full dotbg"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>

                      <div className="bg-sky-800 text-sky-200 rounded-lg  text-white tracking-wider text-center">
                        <label
                          htmlFor="toggleC"
                          className="flex items-center cursor-pointer justify-between p-3"
                        >
                          <div className="mr-3 text-white font-medium">
                            Include Numbers
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggleC"
                              className="sr-only"
                              {...register("numbers")}
                            />
                            <div className="block bg-gray-500 w-14 h-8 rounded-full dotbg"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                      <div className="bg-sky-800 text-sky-200 rounded-lg  text-white tracking-wider text-center">
                        <label
                          htmlFor="toggleD"
                          className="flex items-center cursor-pointer justify-between p-3"
                        >
                          <div className="mr-3 text-white font-medium">
                            Include Symbols
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggleD"
                              className="sr-only"
                              {...register("symbols")}
                            />
                            <div className="block bg-gray-500 w-14 h-8 rounded-full dotbg"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="font-semibold w-full bg-sky-600  text-white text-sm tracking-widest rounded-lg p-3 text-white uppercase tracking-wider text-center"
                    >
                      Generate Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
