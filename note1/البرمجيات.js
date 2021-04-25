//تغليف جميع البرنامج بحدث اكتمال تحميل الصفحة
document.addEventListener("DOMContentLoaded",function(event){
/*
نعرف المتغير ستورد نوتس 
الذي يمثل قيمة عناصرالمصفوفة
 المستعادة من التابع لوكال ستوريج 
 باستخدام أحد واصفاته المسماة قيت آيتم
 بعد تحويله أو إرجاعه إلى مصفوفة باستخداك التابع جيسون
 مع أحد واصفاته المسماة بارس والتي تقوم بإعادة 
 المصفوفات التي حوِّلت إلى سلسة محارف إلى مصفوفة مرة أخرى
*/
let storedNotes = JSON.parse (localStorage.getItem("notes")),
/*
ثم نقوم بتعريف المصفوفة نوتس أراي التي تحمل جميع
المذكرات التي يدخلها المستخدم على شكل كائنات
ونسند إليها قيمة المتغير ستورد نوتس إذا كان يحوي قيمة
 المذكرات في آخر مرة فتح فيها التطبيق
 أما إذا كان التطبيق يفتح لأول مرة والمتغير ستوردنوتس
 لايحتوي على قيمة نسند فراغ إلى نوتس أراي حتى يقوم المستخدم
 بملئها. 
*/
notesArray = storedNotes?storedNotes:[],
//ثم نعرف عداد المتغيرات الذي سيزيد واحد كلما أدخلت مذكرة جديدة
count = 0,
//ثم نضيف متغير نحدد فيه القائمة التي نعرض فيها المذكرات باستخدام المعرف الخاص بها
list = document.getElementById("list"),
//ثم نضيف متغير نحدد فيه الوسم الذي يحمل قالب التعديل باستخدام المعرف الخاص به
divEdit = document.getElementById("div-edit");
//ثم نستدعي دالة تحديث المذكرات وهذا لكي تضهر المذكرات المحفوضة
listRefresh();
//نضيف دالة تستدعي نفسها حالما نضغط على زر الإضافة عن طريق استدعائه عبر المعرف ثم نضيف له حدث الضغط
document.getElementById("add")
.addEventListener("click",function() {
    //داخل الدالة نقوم بتعريف متغير للإسم ونسند له قيمة الإسم الذي أدخله المستخدم عن طريق المعرف الخاص به
    let name = document.getElementById("name").value,
    //ثم نقوم يتعريف متغير المحتوى ونعطيه قيمة محتوى المذكرة الذي أدخله المستخدم عن طريق المعرف الخاص يه
    content = document.getElementById("content").value,
    //ثم نعرف متغير التاريخ ونسند له تاريخ اللحظة التي أضاف فيها المتخد المذكرة
    date = new Date();
    //نضع شرط يعرض تنبيه إذا كانت المذكرة بلا اسم
    if (name === ""){
        alert("أدخل اسم للمذكرة من فضلك");
    }
    //إذا لم يتحقق الشرط الأول يتم إضافة عناصر المذكرة إلى كائن جديد ضمن المصفوفة نوتس أراي عن طريق التابع بوش الذي يضيف عنصر إلى المصفوفة
    else {
        notesArray.push({
            id : count,
            name,
            content,
            date
        })
//ثم نزيد قيمة العداد واحد لأن المستخدم أضاف مذكرة واحدة
        count++;
        console.log("تمت الإضافة");
        
    }
//ثم نقوم بحذف محتوى حقل الإسم والمحتوى عن طريق إسناد قيمة فارغة إلى كل منهما
    document.getElementById("name").value ="";
    document.getElementById("content").value ="";
//ثم نستدعي دالة تحديث المذكرات حتى تضهر المذكرة الجديدة
    listRefresh();
    

})
// نقوم بتعريف دالة تحديث المذكرات ونعطيها التعليمات الخاصة بها
function listRefresh(){
    //نسند قيمة فارغة إلى قائمة المذكرات
    list.innerHTML = "";
    //نعرف حلقة تقوم بملء قائمة المذكرات من مصفوفة المذكرات
    for (let i = 0; i < notesArray.length; i++){
        /*
        نعرف متغير يأخذ قيمة الإسم من المصفوفة ترتيبه حسب الدورة 
         حيث أنه في الدورة الأولى سيكون قيمته بقيمة اسم المذكرة الأولى 
         وفي  الدورة الثانية سيكون قيمته بقيمة اسم المذكرة الثانية وهكذا
        */
        let name = notesArray[i].name,
        /*
        نعرف متغير يأخذ قيمة التاريخ من المصفوفة ترتيبه حسب الدورة 
         حيث أنه في الدورة الأولى سيكون قيمته بقيمة التاريخ الذي أضيفت فيه  المذكرة الأولى 
         وفي  الدورة الثانية سيكون قيمته بقيمة التاريخ الذي أضيفت فيه المذكرة الثانية وهكذا
        */
        date = new Date(notesArray[i].date),
        //نقوم بتعريف نتعير آخر للتاريخ نعطيه القيم التي نحتاجها من الكائن ديت فقط على شكل سلسلة محارف
        dateString = date.getFullYear() + "/" + (date.getMonth() +1) + "/" + date.getDate();
        //نعرف المتغير الذي سيحمل اسم المذكرة ويدخل بها إلى القائمة
        let divName,
        //نعرف المتغير الذي سيحمل تاريخ إنشاء المذكرة ويدخل بها إلى القائمة
        divDate,
        //نعرف متغير ينشئ وسم عنصر جديد في القائمة حتى تضهر ضمنه المعلوات
        element = document.createElement("LI");
        //ثم نعطي المتغير خاصية هو رقم المذكرة
        element.setAttribute("data-id", notesArray[i].id);
        //ننشئ وسم ديف لمتغير الإسم
        divName = document.createElement("DIV");
        //نضيف له صنفاًحتى نتمكن من إجراء التنسيقات عليه
        divName.setAttribute("class","div-name");
        //نجعل القيمة النصية للوسم الذي أنشأناه مساوية لمتغير الإسم الذي يحمل اسم المذكرة
        divName.textContent = name;
        //ننشئ وسم ديف لمتغير التاريخ
        divDate = document.createElement("DIV");
        //نضيف له صنفاًحتى نتمكن من إجراء التنسيقات عليه
        divDate.setAttribute("class","div-date");
        //نجعل القيمة النصية للوسم الذي أنشأناه مساوية لمتغير التاريخ الذي يحمل المعلومات المطلوبة من متغير تاريخ إنشاء المذكرة
        divDate.textContent = dateString;
        //نقوم بإدراج المعلومات داخل عنصر القائمة
        element.appendChild(divName);
        element.appendChild(divDate);
        //نضيف حدث الضغط للعنصر الذي يحوي معلومات المذكرة ثم ضمن الحدث نستدعي دالىة تعرض قالب التعديل
        element.addEventListener("click",showItem);
        //ندرج العنصر إلى القائمة
        list.appendChild(element);
        //نخزن المصفوفة  في لوكال ستوريج بعد تحويلها إلى سلسلة محارف باستخدام التابع سترينجيفاي من الكائن جيسون
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }
    //نعرف الدالة التي تعرض قالب التعديل عندما نضغط على العنصر
}
function showItem(){
    //ننزع خاصية الإخفاء عن قالب التعديل
    divEdit.classList.remove("hide");
    //نعرف متعير نسند له قيمة خاصية رقم المذكرة
    let id = this.getAttribute("data-id"),
    //ننشئ متغيرين للإسم والمحتوى
    name = "",
    content = "";
    //نضع شرط يقوم بإزالة الواصفة من آخرعمليةحفظ حتى لايكون هناك اكثر من عنصر له نفس الواصفة 
    if(document.querySelector("#list li.selected")!=null){
        document.querySelector("#list li.selected").classList.remove("selected");
    }
    //نضيف الواصفة سيليكت إلى العنصر
    this.classList.add("selected");
    //ننشئ حلقة تدور على عناصر المصفوفة نوتس أراي حتى نستطيع إيجاد العنصر الذي تم الضغط عليه
    for(let e=0; e < notesArray.length; e++){
        // نضع شرط إذا كان المتغير الذي أعطيناه قيمة خاصيةرقم المذكرة التي تم الضغط عليها يتساوى 
        //مع إحدى ارقام المذكرات , نأخذ محتوياتها
        if(id == notesArray[e].id){
            //نسند اسم المذكرة المحددة إلى المتغير الإسم
            name=notesArray[e].name;
            //نسند محتوى المذكرة المحددة إلى المتغير المحتوى
            content=notesArray[e].content;
        }
    }
    //نعطي حقل تعديل الإسم قيمة متغير الإسم الذي يحمل اسم المذكرة المحدد
    document.getElementById("name-edit").value = name;
    //نعطي حقل تعديل المحتوى قيمة متغير المحتوى الذي يحمل محتوى المذكرة المحددة
    document.getElementById("edit-content").value = content;
}
// النضيف حدث الضغط إلى زر الحفظ 
document.getElementById("save").addEventListener("click",function(){
    //داخل دالة جدث الضغط على زر الحفظ نعرف متغير للاسم نعطيه قيمة الإسم المدخل في حقل تعديل الاسم
    let name = document.getElementById("name-edit").value,
    //نعرف متغير آخر للمحتوى نعطيه قيمة المحتوى المدخل في حقل تعديل المحتوى
    content = document.getElementById("edit-content").value,
    //نعرف متغير آخر للمعرف نعطيه المعرف الخاص بالعنصر الذي تم اختياره
    id = document.querySelector("#list li.selected").getAttribute("data-id");
    //نعرف حلقة تدور على عناصر المصفوفة نوتس أراي
    for(let i=0; i<notesArray.length; i++){
        //نعرف شرطاً يقيس قيمة المعرف الخاص بالعنصر من المصفوفة نوتس أراي 
        //مع متغير المعرف الذي عرفناه قبل قليل فإذا تساوت القيمتين
        //يسند عنصر الإسم من كائن العنصر الذي تم اختياره إلى متغير الاسم وهكذا مع المحتوى
        if(id==notesArray[i].id){
            notesArray[i].name=name;
            notesArray[i].content=content;
            //بعدأهذ المطلوب نكسر الحلقة
            break;
        }
    }
    listRefresh();
    document.querySelector(`#list li[data-id="${id}"]`).classList.add("selected");

});
document.getElementById("cancel")
.addEventListener("click",function(){

    divEdit.classList.add("hide");
    document.querySelector("#list li.selected").classList.remove("selected");
});
document.getElementById("remove").addEventListener("click",function(){
    let id = document.querySelector("#list li.selected").getAttribute("data-id"),
    confirmResult = confirm("تأكيد حذف المذكرة");
    if(confirmResult){
        for(let i=0; i<notesArray.length; i++){
            if(id == notesArray[i].id){
                notesArray.splice(i,1);
                break;
            }
        }
    }
    listRefresh();
    divEdit.classList.add("hide");
});
});
