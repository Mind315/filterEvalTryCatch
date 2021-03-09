// создаем стрелочную функцию с параметрами type  спред оператором и значениями, значения фильтруем по типу
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// создаем функицю для скрытия всех блоков
	hideAllResponseBlocks = () => {
		// создаем копию методом Array.from();
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// перебираем и во всех блоках отключай стиль дисплей
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
// создаем функцию показать блок с параметрами селектор блока, текст сообщения, селектор спана
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// скрываем блоки 
		hideAllResponseBlocks();
		// блоки с переданными селекторами показываем через дисплей блок
		document.querySelector(blockSelector).style.display = 'block';
		// если это спан
		if (spanSelector) {
			// тогда спанам с селекторами пишем в текст переданное сообщение из msgText. 
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
// функция показать ощибки с параметром сообщение - вызывает функцию показать блок с 3 аргументами(блок для ошибки, сообщение, спан с id ошибки)
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
// функция показать результат с параметром сообщение - вызывает функцию показать блок с 3 аргументами(блок с ок результатомБ сообщение, спан с id ок)

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
// функция показа если данные отсутвуют
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
// делаем функцию фильтрации данных из инпута Данные
	tryFilterByType = (type, values) => {
		// тут у нас трай, мало ли руки если косяков наделали
		try {
			// через евал запускаем функцию филтер бай, джойним массив их данных TYPE через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// ооооо тут у нас тернарник проверяемт valuesArray
			const alertMsg = (valuesArray.length) ?
			//если есть запишем это через интерполяцию в alertMsg
				`Данные с типом ${type}: ${valuesArray}` :
				// если нет напишем что нет данных с таким типом
				`Отсутствуют данные типа ${type}`;
			// запускаем функцию показать результаты и передаем в нее переменную в которой то, что запиали выше 
			showResults(alertMsg);
		// если в трай были косяки - то отработает этот код но ничего не поломается. спаибо кетчу
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};
// находим кнопку и передаем в переменную по id
const filterButton = document.querySelector('#filter-btn');
// на кнопку слушатель по клику
filterButton.addEventListener('click', e => {
	// в переменную все с селекта с id type там 3 опции
	const typeInput = document.querySelector('#type');
	// а в эту инпут с id data
	const dataInput = document.querySelector('#data');
// если инпут пустой 
	if (dataInput.value === '') {
		// этот метод покажет всплывшее сообщение "бла бла бла у вас пусто". Метод позволет настраивать обработку ошибок
		//с выводов сообщения при отпраке формы - гугл так говорит
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// ну и показать результаты но там пусто.
		showNoResults();
		// а иначе
	} else {
		// пустое сообщение в методе очищает ошибку
		dataInput.setCustomValidity('');
		// страница не перезагружается при нажатии кнопки
		e.preventDefault();
		// запускаем фильтр передаем нужный тип из селекта и из инпута и им срезаем пробелы по краям 
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});
// конец.

