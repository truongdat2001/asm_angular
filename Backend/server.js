const express = require("express");
const db = require("./db");
const cors = require("cors");
const e = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API NodeJS ASM" });
});

app.get("/du-an", (req, res) => {
  const sql = "SELECT * FROM du_an ORDER BY ngay_bat_dau DESC";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.json(data);
  });
});

app.get("/du-an/:id", (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Dự án không tồn tại" });
  }

  const sql = "SELECT * FROM du_an WHERE id=? ORDER BY ngay_bat_dau DESC";
  db.query(sql, id, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Dự án không có" });
    }
    res.json(data);
  });
});

app.get("/nhan-vien", (req, res) => {
  const sql = "SELECT * FROM nhan_vien";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.json(data);
  });
});

app.get("/nhan-vien/:id", (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Nhân viên không tồn tại" });
  }

  const sql = "SELECT * FROM nhan_vien WHERE id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Nhân viên không có" });
    }
    res.json(data);
  });
});

app.get("/task", (req, res) => {
  const sql = "SELECT * FROM task";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.json(data);
  });
});

app.get("/task/:id", (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Task không tồn tại" });
  }

  const sql = "SELECT * FROM task WHERE id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Task không có" });
    }
    res.json(data);
  });
});

// THÊM DỰ ÁN
app.post("/du-an", (req, res) => {
  const { ten_du_an, ngay_bat_dau, tien, leader, thanh_vien } = req.body;
  if (!ten_du_an || !ngay_bat_dau || !tien || !leader || !thanh_vien) {
    return res.status(400).json({ thongbao: "Không được để trống" });
  }

  const sql =
    "INSERT INTO du_an SET ten_du_an=?, ngay_bat_dau=?, tien=?, leader=?, thanh_vien=?";
  db.query(
    sql,
    [ten_du_an, ngay_bat_dau, tien, leader, thanh_vien.join(",")],
    (err) => {
      if (err) {
        return res.status(500).json({ thongbao: "Lỗi khi thêm dự án: " + err });
      }
      res.json({ thongbao: "Đã thêm dự án" });
    }
  );
});

// CẬP NHẬT DỰ ÁN
app.put("/du-an/:id", (req, res) => {
  const { ten_du_an, ngay_bat_dau, tien, leader, thanh_vien } = req.body;
  const id = req.params.id;
  if (!ten_du_an || !ngay_bat_dau || !tien || !leader || !thanh_vien) {
    return res.status(400).json({ thongbao: "Không được để trống" });
  }

  const sql =
    "UPDATE du_an SET ten_du_an=?, ngay_bat_dau=?, tien=?, leader=?, thanh_vien=? WHERE id=?";
  db.query(
    sql,
    [ten_du_an, ngay_bat_dau, tien, leader, thanh_vien, id],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ thongbao: "Lỗi khi cập nhật dự án: " + err });
      }
      res.json({ thongbao: "Cập nhật dự án thành công" });
    }
  );
});

// XÓA DỰ ÁN
app.delete("/du-an/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM du_an WHERE id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      return res.status(500).json({ thongbao: "Lỗi khi xóa dự án: " + err });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ thongbao: "Dự án không tồn tại" });
    }
    res.json({ thongbao: "Đã xóa dự án thành công" });
  });
});

// THÊM NHÂN VIÊN
app.post("/nhan-vien", (req, res) => {
  const { hovaten, email, mat_khau, ngay_sinh, gioi_tinh, khu_vuc } = req.body;
  if (!hovaten || !email || !mat_khau || !ngay_sinh || !gioi_tinh || !khu_vuc) {
    return res.status(400).json({ thongbao: "Không được bỏ trống" });
  }

  const sql =
    "INSERT INTO nhan_vien SET hovaten=?, email=?, mat_khau=?, ngay_sinh=?, gioi_tinh=?, khu_vuc=?";
  db.query(
    sql,
    [hovaten, email, mat_khau, ngay_sinh, gioi_tinh, khu_vuc],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ thongbao: "Có lỗi khi thêm nhân viên: " + err });
      }
      res.json({ thongbao: "Thêm nhân viên thành công" });
    }
  );
});

// CẬP NHẬT NHÂN VIÊN
app.put("/nhan-vien/:id", (req, res) => {
  const { hovaten, email, mat_khau, ngay_sinh, gioi_tinh, khu_vuc } = req.body;
  const id = req.params.id;
  if (!hovaten || !email || !mat_khau || !ngay_sinh || !gioi_tinh || !khu_vuc) {
    return res.status(400).json({ thongbao: "Không được bỏ trống" });
  }

  const sql =
    "UPDATE nhan_vien SET hovaten=?, email=?, mat_khau=?, ngay_sinh=?, gioi_tinh=?, khu_vuc=? WHERE id=?";
  db.query(
    sql,
    [hovaten, email, mat_khau, ngay_sinh, gioi_tinh, khu_vuc, id],
    (err) => {
      if (err) {
        return res.status(500).json({ thongbao: "Lỗi khi cập nhật: " + err });
      }
      res.json({ thongbao: "Cập nhật nhân viên thành công" });
    }
  );
});

// XÓA NHÂN VIÊN
app.delete("/nhan-vien/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE  FROM nhan_vien WHERE id=?";
  // console.log(id);
  db.query(sql, id, (err, data) => {
    if (err) {
      return res.status(500).json({ thongbao: "Xóa thất bại" + err });
    } else {
      res.status(200).json({ thongbao: "Xóa thành công" });
    }
  });
});

// THÊM TASK
app.post("/task", (req, res) => {
  const { ten_task, du_an_id, nhan_vien_id, mo_ta, trang_thai } = req.body;
  if (!ten_task || !du_an_id || !nhan_vien_id || !mo_ta || !trang_thai) {
    return res.status(400).json({ thongbao: "Không được để trống" });
  }

  const sql =
    "INSERT INTO task SET ten_task=?, du_an_id=?, nhan_vien_id=?, mo_ta=?, trang_thai=?";
  db.query(
    sql,
    [ten_task, du_an_id, nhan_vien_id, mo_ta, trang_thai],
    (err) => {
      if (err) {
        return res.status(500).json({ thongbao: "Lỗi khi thêm dự án: " + err });
      }
      res.json({ thongbao: "Thêm task thành công" });
    }
  );
});

// CẬP NHẬT TASK
app.put("/task/:id", (req, res) => {
  const { ten_task, du_an_id, nhan_vien_id, mo_ta, trang_thai } = req.body;
  const id = req.params.id;
  if (!ten_task || !du_an_id || !nhan_vien_id || !mo_ta || !trang_thai) {
    return res.status(400).json({ thongbao: "Không được để trống" });
  }

  const sql =
    "UPDATE task SET ten_task=?, du_an_id=?, nhan_vien_id=?, mo_ta=?, trang_thai=? WHERE id=?";
  db.query(
    sql,
    [ten_task, du_an_id, nhan_vien_id, mo_ta, trang_thai, id],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ thongbao: "Lỗi khi cập nhật task: " + err });
      }
      res.json({ thongbao: "Cập nhật task thành công" });
    }
  );
});

// XÓA TASK
app.delete("/task/:id", (req, res) => {
  const id = req.params.id;
  const checkId = "SELECT * FROM task WHERE id=?";
  db.query(checkId, id, (err, data) => {
    if (err) {
      return res.status(500).json({ thongbao: "Task không tồn tại." });
    }
    if (data.length === 0) {
      return res.status(404).json({ thongbao: "Task không tồn tại." });
    }

    const sql = "DELETE FROM task WHERE id=?";
    db.query(sql, id, (err) => {
      if (err) {
        return res.status(500).json({ thongbao: "Lỗi khi xóa task: " + err });
      }
      res.json({ thongbao: "Xóa task thành công." });
    });
  });
});

app.post("/dang-nhap", (req, res) => {
  let { email, mat_khau } = req.body;
  let sql = `SELECT * FROM nhan_vien  WHERE email=? AND mat_khau=?`;
  db.query(sql, [email, mat_khau], (err, data) => {
    if (data.length === 0) {
      return res.status(401).json({ thongbao: "Tên người dùng hoặc mật khẩu không đúng" })
    } else {
      if (err) res.json({ thongbao: "Có lỗi khi đăng nhập" + err });
      else {
        let payload = { email: data.email, chuc_vu: data.chuc_vu, id: data.id }
        let accesToken = jwt.sign(payload, "fpoly", { expiresIn: "3000s" });
        res.status(200).json({ message: "Đăng nhập thành công", accesToken, payload });
      }
    }
  }
  )
});

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy với port ${port}`);
});
