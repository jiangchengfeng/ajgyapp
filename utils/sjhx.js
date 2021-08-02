// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return true;
		}
	})
	return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator,spe) {
	var actions = [];
	var currentSeparator = undefined === separator ? "," : separator;
  var currentSpe = undefined === spe ? "," : spe;
	var temp = value.split(currentSeparator);
	Object.keys(value.split(currentSeparator)).some((val) => {
		Object.keys(datas).some((key) => {
			if (datas[key].dictValue == ('' + temp[val])) {
				actions.push(datas[key].dictLabel + currentSpe);
			}
		})
	})
	return actions.join('').substring(0, actions.join('').length - 1);
}

// 回显省份
export function selectProvincePerLabel(datas, value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].provinceid == ('' + value)) {
			actions.push(datas[key].provincename);
			return false;
		}
	})
	return actions.join('');
}

// 回显城市
export function selectCityPerLabel(datas, value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].cityid == ('' + value)) {
			actions.push(datas[key].cityname);
			return false;
		}
	})
	return actions.join('');
}

// 回显区县
export function selectDistrictPerLabel(datas, value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].districtid == ('' + value)) {
			actions.push(datas[key].districtname);
			return false;
		}
	})
	return actions.join('');
}

// 回显部门
export function selectDeptPerLabel(datas, value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].deptId == ('' + value)) {
			actions.push(datas[key].deptName);
			return false;
		}
	})
	return actions.join('');
}


// 班组回显
export function selectDictLabel3(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].id == ('' + value)) {
			actions.push(datas[key].bzmc);
			return true;
		}
	})
	return actions.join('');
}

// 线路回显
export function selectDictLabel4(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].id == ('' + value)) {
			actions.push(datas[key].name);
			return true;
		}
	})
	return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels2(datas, value, separator, spe) {
	// value = value.slice(',')
	var actions = [];
	var currentSeparator = undefined === separator ? "," : separator;
	var currentSpe = undefined === spe ? "," : spe;
	var temp = value.split(currentSeparator);
	Object.keys(value.split(currentSeparator)).some((val) => {
		Object.keys(datas).some((key) => {
			if (datas[key].userId == ('' + temp[val])) {
				actions.push(datas[key].nickName + currentSpe);
			}
		})
	})
	return actions.join('').substring(0, actions.join('').length - 1);
}

export function selectUserPerLabel(datas, value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].userId == ('' + value)) {
			actions.push(datas[key].nickName);
			return false;
		}
	})
	return actions.join('');
}

export  function  getPorjectBh() {
      const projectTime = new Date(); // 当前中国标准时间
      const Year = projectTime.getFullYear(); // 获取当前年份 支持IE和火狐浏览器.
      const Month = projectTime.getMonth() + 1; // 获取中国区月份
      const Day = projectTime.getDate(); // 获取几号

      const Hour = projectTime.getHours();
      const Minutes = projectTime.getMinutes();
      const Seconds = projectTime.getSeconds();
      var CurrentDate = String(Year);
      if (Month >= 10) {
        // 判断月份和几号是否大于10或者小于10
        CurrentDate += Month;
      } else {
        CurrentDate += "0" + Month;
      }
      if (Day >= 10) {
        CurrentDate += Day;
      } else {
        CurrentDate += "0" + Day;
      }

      if (Hour >= 10) {
        CurrentDate += Hour;
      } else {
        CurrentDate += "0" + Hour;
      }

      if (Minutes >= 10) {
        CurrentDate += Minutes;
      } else {
        CurrentDate += "0" + Minutes;
      }

      if (Seconds >= 10) {
        CurrentDate += Seconds;
      } else {
        CurrentDate += "0" + Seconds;
      }
      CurrentDate = CurrentDate + Math.floor(Math.random() * 10000);
      return CurrentDate;
    }