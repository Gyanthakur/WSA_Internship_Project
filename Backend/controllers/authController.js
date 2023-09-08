const _0x1f58ff = _0x15d1;
(function (_0x30f561, _0x125bac) {
  const _0x4d89fd = _0x15d1,
    _0x498160 = _0x30f561();
  while (!![]) {
    try {
      const _0x10882b =
        (-parseInt(_0x4d89fd(0xc7)) / 0x1) *
          (-parseInt(_0x4d89fd(0xc4)) / 0x2) +
        (-parseInt(_0x4d89fd(0xca)) / 0x3) * (parseInt(_0x4d89fd(0xd4)) / 0x4) +
        -parseInt(_0x4d89fd(0xd2)) / 0x5 +
        (parseInt(_0x4d89fd(0xdc)) / 0x6) * (-parseInt(_0x4d89fd(0xb0)) / 0x7) +
        (-parseInt(_0x4d89fd(0xd6)) / 0x8) *
          (-parseInt(_0x4d89fd(0xf3)) / 0x9) +
        parseInt(_0x4d89fd(0xc8)) / 0xa +
        parseInt(_0x4d89fd(0xc5)) / 0xb;
      if (_0x10882b === _0x125bac) break;
      else _0x498160["push"](_0x498160["shift"]());
    } catch (_0xd6716f) {
      _0x498160["push"](_0x498160["shift"]());
    }
  }
})(_0x1a35, 0x5baa4);
function _0x15d1(_0x4e0874, _0x1e1368) {
  const _0x1a35cd = _0x1a35();
  return (
    (_0x15d1 = function (_0x15d19d, _0x2f202d) {
      _0x15d19d = _0x15d19d - 0xab;
      let _0x3a24d0 = _0x1a35cd[_0x15d19d];
      return _0x3a24d0;
    }),
    _0x15d1(_0x4e0874, _0x1e1368)
  );
}
const User = require(_0x1f58ff(0xb6)),
  crypto = require("crypto"),
  jwt = require("jsonwebtoken"),
  { promisify } = require(_0x1f58ff(0xc1)),
  ErrorHandler = require(_0x1f58ff(0xe3)),
  Email = require("../utils/email"),
  catchAsyncErrors = require(_0x1f58ff(0xf8)),
  cloudinary = require(_0x1f58ff(0xce))["v2"],
  { CloudinaryStorage } = require(_0x1f58ff(0xc0)),
  multer = require(_0x1f58ff(0xc6)),
  signToken = (_0x17852c) => {
    const _0x5f2644 = _0x1f58ff;
    return jwt[_0x5f2644(0xe6)](
      { id: _0x17852c },
      process["env"][_0x5f2644(0xbb)],
      { expiresIn: process[_0x5f2644(0xd0)][_0x5f2644(0xe1)] + "d" }
    );
  },
  createSendToken = (_0xb6675b, _0x5e2bcd, _0x4b4ea8) => {
    const _0x28f41f = _0x1f58ff,
      _0x18a71b = signToken(_0xb6675b["_id"]),
      _0x28e2bc = {
        expires: new Date(
          Date[_0x28f41f(0xb3)]() +
            process[_0x28f41f(0xd0)][_0x28f41f(0xe1)] *
              0x18 *
              0x3c *
              0x3c *
              0x3e8
        ),
        httpOnly: !![],
      };
    _0x4b4ea8["cookie"](_0x28f41f(0xb2), _0x18a71b, _0x28e2bc),
      (_0xb6675b["password"] = undefined),
      _0x4b4ea8["status"](_0x5e2bcd)["json"]({
        success: !![],
        token: _0x18a71b,
        data: { user: _0xb6675b },
      });
  };
cloudinary["config"]({
  cloud_name: _0x1f58ff(0xad),
  api_key: _0x1f58ff(0xdd),
  api_secret: _0x1f58ff(0xaf),
});
function _0x1a35() {
  const _0x5e2722 = [
    "sign",
    "avatars",
    "uploader",
    "authorization",
    "error",
    "user",
    "correctPassword",
    "body",
    "update",
    "password",
    "Bearer",
    "upload",
    "passwordResetToken",
    "1818549aPTpHd",
    "Invalid\x20Email\x20or\x20Password",
    "public_id",
    "verify",
    "single",
    "../middlewares/catchAsyncErrors",
    "Old\x20password\x20is\x20incorrect",
    "createPasswordResetToken",
    "df8dnez80",
    "secure_url",
    "c6Eka2VMeuOk7Od0JvHFTCNxzDE",
    "2982EMHOhW",
    "getUserProfile",
    "jwt",
    "now",
    "token",
    "url",
    "../models/user",
    "logout",
    "/users/resetPassword/",
    "email",
    "+password",
    "JWT_SECRET",
    "digest",
    "destroy",
    "headers",
    "scale",
    "multer-storage-cloudinary",
    "util",
    "changedPasswordAfter",
    "passwordResetExpires",
    "46NDHRAK",
    "9236931ExspUq",
    "multer",
    "5218DrStfu",
    "6846760uZCwLr",
    "findOne",
    "484827MxWwZH",
    "Please\x20enter\x20email\x20&\x20password",
    "forgotPassword",
    "Token\x20is\x20invalid\x20or\x20has\x20expired",
    "cloudinary",
    "findById",
    "env",
    "save",
    "2871990KlyQVV",
    "select",
    "8WWbiMm",
    "json",
    "8DgaNPH",
    "status",
    "login",
    "FRONTEND_URL",
    "User\x20recently\x20changed\x20password\x20!\x20please\x20log\x20in\x20again.",
    "avatar",
    "8076sFpQTi",
    "385231413173631",
    "passwordConfirm",
    "params",
    "Password\x20updated\x20successfully",
    "JWT_EXPIRES_TIME",
    "Logged\x20out",
    "../utils/errorHandler",
    "findByIdAndUpdate",
    "updateProfile",
  ];
  _0x1a35 = function () {
    return _0x5e2722;
  };
  return _0x1a35();
}
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: _0x1f58ff(0xe7),
      transformation: [{ width: 0x96, crop: _0x1f58ff(0xbf) }],
    },
  }),
  upload = multer({ storage: storage })[_0x1f58ff(0xf7)](_0x1f58ff(0xdb));
(exports["signup"] = catchAsyncErrors(
  async (_0x92e1c1, _0xb3ba0f, _0x574ef8) => {
    const _0x77c014 = _0x1f58ff,
      {
        name: _0x39a859,
        email: _0x3854f1,
        password: _0x506851,
        passwordConfirm: _0x304596,
        phoneNumber: _0x7ca2be,
      } = _0x92e1c1[_0x77c014(0xed)],
      _0x38feaf = await cloudinary[_0x77c014(0xe8)][_0x77c014(0xf1)](
        _0x92e1c1[_0x77c014(0xed)][_0x77c014(0xdb)][_0x77c014(0xb5)],
        { folder: "avatars", width: 0x96, crop: _0x77c014(0xbf) }
      ),
      _0x1e2441 = await User["create"]({
        name: _0x39a859,
        email: _0x3854f1,
        password: _0x506851,
        passwordConfirm: _0x304596,
        phoneNumber: _0x7ca2be,
        avatar: {
          public_id: _0x38feaf[_0x77c014(0xf5)],
          url: _0x38feaf["secure_url"],
        },
      });
    createSendToken(_0x1e2441, 0xc8, _0xb3ba0f);
  }
)),
  (exports[_0x1f58ff(0xd8)] = catchAsyncErrors(
    async (_0x2273c6, _0x35cc17, _0x3f9055) => {
      const _0x5eccbc = _0x1f58ff,
        { email: _0x57773f, password: _0x5cf6be } = _0x2273c6["body"];
      if (!_0x57773f || !_0x5cf6be)
        return _0x3f9055(new ErrorHandler(_0x5eccbc(0xcb), 0x190));
      const _0x5c332c = await User[_0x5eccbc(0xc9)]({ email: _0x57773f })[
        _0x5eccbc(0xd3)
      ](_0x5eccbc(0xba));
      if (!_0x5c332c)
        return _0x3f9055(new ErrorHandler(_0x5eccbc(0xf4), 0x191));
      const _0x6257e3 = await _0x5c332c[_0x5eccbc(0xec)](
        _0x5cf6be,
        _0x5c332c[_0x5eccbc(0xef)]
      );
      if (!_0x6257e3)
        return _0x3f9055(new ErrorHandler(_0x5eccbc(0xf4), 0x191));
      createSendToken(_0x5c332c, 0xc8, _0x35cc17);
    }
  )),
  (exports["protect"] = catchAsyncErrors(
    async (_0x3be003, _0x37dba8, _0x2749ce) => {
      const _0x1f44b2 = _0x1f58ff;
      let _0x1cfc99;
      if (
        _0x3be003[_0x1f44b2(0xbe)][_0x1f44b2(0xe9)] &&
        _0x3be003["headers"][_0x1f44b2(0xe9)]["startsWith"](_0x1f44b2(0xf0))
      )
        _0x1cfc99 =
          _0x3be003[_0x1f44b2(0xbe)]["authorization"]["split"]("\x20")[0x1];
      else
        _0x3be003["cookies"][_0x1f44b2(0xb2)] &&
          (_0x1cfc99 = _0x3be003["cookies"]["jwt"]);
      if (!_0x1cfc99)
        return _0x2749ce(
          new ErrorHandler(
            "You\x20are\x20not\x20logged\x20in!\x20Please\x20log\x20in\x20to\x20get\x20access.",
            0x194
          )
        );
      const _0x8f6b = await promisify(jwt[_0x1f44b2(0xf6)])(
          _0x1cfc99,
          process[_0x1f44b2(0xd0)][_0x1f44b2(0xbb)]
        ),
        _0x4af898 = await User["findById"](_0x8f6b["id"]);
      if (!_0x4af898)
        return _0x2749ce(
          new ErrorHandler(
            "User\x20recently\x20changed\x20password\x20!\x20please\x20log\x20in\x20again.",
            0x194
          )
        );
      if (_0x4af898[_0x1f44b2(0xc2)](_0x8f6b["iat"]))
        return _0x2749ce(new ErrorHandler(_0x1f44b2(0xda), 0x194));
      (_0x3be003["user"] = _0x4af898), _0x2749ce();
    }
  )),
  (exports[_0x1f58ff(0xb1)] = catchAsyncErrors(
    async (_0x4c5be9, _0x404027, _0x2173dd) => {
      const _0x217177 = _0x1f58ff,
        _0x68cdc6 = await User["findById"](_0x4c5be9[_0x217177(0xeb)]["id"]);
      _0x404027[_0x217177(0xd7)](0xc8)["json"]({
        success: !![],
        user: _0x68cdc6,
      });
    }
  )),
  (exports["updatePassword"] = async (_0x3bf59e, _0x432794, _0x4c6f18) => {
    const _0xffec09 = _0x1f58ff;
    try {
      const {
          oldPassword: _0x323655,
          newPassword: _0xa78a4d,
          newPasswordConfirm: _0x4fc321,
        } = _0x3bf59e[_0xffec09(0xed)],
        _0x4274b3 = await User["findById"](_0x3bf59e[_0xffec09(0xeb)]["id"])[
          _0xffec09(0xd3)
        ](_0xffec09(0xba)),
        _0x2591c3 = await _0x4274b3[_0xffec09(0xec)](
          _0x323655,
          _0x4274b3[_0xffec09(0xef)]
        );
      if (!_0x2591c3)
        return _0x4c6f18(new ErrorHandler(_0xffec09(0xab), 0x190));
      (_0x4274b3[_0xffec09(0xef)] = _0xa78a4d),
        (_0x4274b3["passwordConfirm"] = _0x4fc321),
        await _0x4274b3[_0xffec09(0xd1)](),
        _0x432794[_0xffec09(0xd7)](0xc8)[_0xffec09(0xd5)]({
          success: !![],
          message: _0xffec09(0xe0),
        });
    } catch (_0x276b73) {
      return (
        console[_0xffec09(0xea)](_0x276b73),
        _0x4c6f18(new ErrorHandler("Internal\x20Server\x20Error", 0x1f4))
      );
    }
  }),
  (exports[_0x1f58ff(0xe5)] = catchAsyncErrors(
    async (_0x52fefd, _0x3d458b, _0x457ea4) => {
      const _0x406210 = _0x1f58ff,
        _0x5aa351 = {
          name: _0x52fefd[_0x406210(0xed)]["name"],
          email: _0x52fefd["body"][_0x406210(0xb9)],
        };
      if (_0x52fefd[_0x406210(0xed)]["avatar"] !== "") {
        const _0x37a360 = await User[_0x406210(0xcf)](
            _0x52fefd[_0x406210(0xeb)]["id"]
          ),
          _0x1ce2bd = _0x37a360["avatar"][_0x406210(0xf5)],
          _0x132f33 = await cloudinary[_0x406210(0xe8)][_0x406210(0xbd)](
            _0x1ce2bd
          ),
          _0x3c0524 = await cloudinary[_0x406210(0xe8)][_0x406210(0xf1)](
            _0x52fefd[_0x406210(0xed)][_0x406210(0xdb)],
            { folder: "avatars", width: 0x96, crop: _0x406210(0xbf) }
          );
        _0x5aa351[_0x406210(0xdb)] = {
          public_id: _0x3c0524[_0x406210(0xf5)],
          url: _0x3c0524[_0x406210(0xae)],
        };
      }
      const _0x4ecf36 = await User[_0x406210(0xe4)](
        _0x52fefd["user"]["id"],
        _0x5aa351,
        { new: !![], runValidators: !![], useFindAndModify: ![] }
      );
      _0x3d458b[_0x406210(0xd7)](0xc8)[_0x406210(0xd5)]({ success: !![] });
    }
  )),
  (exports[_0x1f58ff(0xcc)] = catchAsyncErrors(
    async (_0x20d2e7, _0x35851b, _0x19792f) => {
      const _0x3b37bd = _0x1f58ff,
        _0x4e4ba6 = await User[_0x3b37bd(0xc9)]({
          email: _0x20d2e7[_0x3b37bd(0xed)][_0x3b37bd(0xb9)],
        });
      if (!_0x4e4ba6)
        return _0x19792f(
          new ErrorHandler(
            "There\x20is\x20no\x20user\x20with\x20email\x20address\x20.",
            0x194
          )
        );
      const _0x2b6b7a = _0x4e4ba6[_0x3b37bd(0xac)]();
      await _0x4e4ba6[_0x3b37bd(0xd1)]({ validateBeforeSave: ![] });
      try {
        const _0x4c8527 =
          process["env"][_0x3b37bd(0xd9)] + _0x3b37bd(0xb8) + _0x2b6b7a;
        return (
          await new Email(_0x4e4ba6, _0x4c8527)["sendPasswordReset"](),
          _0x35851b[_0x3b37bd(0xd7)](0xc8)[_0x3b37bd(0xd5)]({
            status: "success",
            message: "Token\x20sent\x20to\x20email!",
          })
        );
      } catch (_0x19a632) {
        return (
          (_0x4e4ba6[_0x3b37bd(0xf2)] = undefined),
          (_0x4e4ba6[_0x3b37bd(0xc3)] = undefined),
          await _0x4e4ba6["save"]({ validateBeforeSave: ![] }),
          _0x19792f(
            new ErrorHandler(
              "There\x20was\x20an\x20error\x20sending\x20the\x20email,\x20try\x20again\x20later!",
              0x1f4
            )
          )
        );
      }
    }
  )),
  (exports["resetPassword"] = catchAsyncErrors(
    async (_0xa8d9b7, _0x4ef4a6, _0x51a559) => {
      const _0x3709c8 = _0x1f58ff,
        _0xd7286f = crypto["createHash"]("sha256")
          [_0x3709c8(0xee)](_0xa8d9b7[_0x3709c8(0xdf)][_0x3709c8(0xb4)])
          [_0x3709c8(0xbc)]("hex"),
        _0xa5f91d = await User[_0x3709c8(0xc9)]({
          passwordResetToken: _0xd7286f,
          passwordResetExpires: { $gt: Date[_0x3709c8(0xb3)]() },
        });
      if (!_0xa5f91d)
        return _0x51a559(new ErrorHandler(_0x3709c8(0xcd), 0x190));
      (_0xa5f91d[_0x3709c8(0xef)] =
        _0xa8d9b7[_0x3709c8(0xed)][_0x3709c8(0xef)]),
        (_0xa5f91d[_0x3709c8(0xde)] =
          _0xa8d9b7[_0x3709c8(0xed)][_0x3709c8(0xde)]),
        (_0xa5f91d[_0x3709c8(0xf2)] = undefined),
        (_0xa5f91d[_0x3709c8(0xc3)] = undefined),
        await _0xa5f91d["save"](),
        createSendToken(_0xa5f91d, 0xc8, _0x4ef4a6);
    }
  )),
  (exports[_0x1f58ff(0xb7)] = catchAsyncErrors(
    async (_0x514926, _0x998b74, _0x2d51f9) => {
      const _0x4f4bdd = _0x1f58ff;
      _0x998b74["cookie"](_0x4f4bdd(0xb2), null, {
        expires: new Date(Date[_0x4f4bdd(0xb3)]()),
        httpOnly: !![],
      }),
        _0x998b74[_0x4f4bdd(0xd7)](0xc8)[_0x4f4bdd(0xd5)]({
          success: !![],
          message: _0x4f4bdd(0xe2),
        });
    }
  ));
