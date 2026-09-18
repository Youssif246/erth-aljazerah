import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './values.component.html',
  styleUrl: './values.component.css'
})
export class ValuesComponent {
  values = [
    {
      num: '٠١',
      title: 'الأصالة',
      tag: 'حفظ الجوهر',
      iconClass: 'fa-solid fa-monument',
      desc: 'نحافظ على روح الموروث وهويته ونحترم تفاصيله الدقيقة دون تزييف أو اختزال.'
    },
    {
      num: '٠٢',
      title: 'الاعتزاز',
      tag: 'فخر وانتماء',
      iconClass: 'fa-solid fa-shield-halved',
      desc: 'نقدم الإرث بوصفه قيمة وهوية ومصدراً للفخر والشموخ والانتماء الوطني.'
    },
    {
      num: '٠٣',
      title: 'الإبداع',
      tag: 'روح العصر',
      iconClass: 'fa-solid fa-wand-magic-sparkles',
      desc: 'نبتكر طرقاً جديدة لتقديم الموروث دون تشويهه، موازنين بين عراقة الماضي وأدوات العصر.'
    },
    {
      num: '٠٤',
      title: 'التجربة',
      tag: 'انغماس حسي',
      iconClass: 'fa-solid fa-compass',
      desc: 'نهتم بما يراه الزائر ويسمعه ويشعر به ويشارك فيه، لنصنع انغماساً حسياً ووجدانياً كاملاً.'
    },
    {
      num: '٠٥',
      title: 'التنوع',
      tag: 'ثراء المناطق',
      iconClass: 'fa-solid fa-layer-group',
      desc: 'نحتفي باختلاف مناطق المملكة وتعدد فنونها وحِرفها وقصصها وخصوصية كل بيئة.'
    },
    {
      num: '٠٦',
      title: 'الجودة',
      tag: 'إتقان تنفيذي',
      iconClass: 'fa-solid fa-gem',
      desc: 'نهتم بالتفاصيل من الفكرة والبحث المعمق إلى دقة التصميم وبراعة التنفيذ الميداني.'
    }
  ];
}
